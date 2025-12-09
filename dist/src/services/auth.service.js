"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_EXPIRES = (process.env.JWT_ACCESS_EXP || '15m');
const REFRESH_EXPIRES = (process.env.JWT_REFRESH_EXP || '7d');
async function register(data) {
    const hashed = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma.user.create({
        data: { email: data.email, password: hashed, name: data.name }
    });
    return { id: user.id, email: user.email, name: user.name };
}
async function login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Invalid credentials');
    const ok = await bcrypt_1.default.compare(password, user.password);
    if (!ok)
        throw new Error('Invalid credentials');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refresh = jsonwebtoken_1.default.sign({ sub: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
    await prisma.refreshToken.create({
        data: { token: refresh, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) }
    });
    return { access, refresh };
}
async function refresh(token) {
    const rt = await prisma.refreshToken.findUnique({ where: { token } });
    if (!rt || rt.revoked)
        throw new Error('Invalid refresh token');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const access = jsonwebtoken_1.default.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
    return { access };
}
async function logout(token) {
    await prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } });
}
