"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.refresh = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const authService = __importStar(require("../services/auth.service"));
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
const register = async (req, res) => {
    const parsed = registerSchema.parse(req.body);
    const user = await authService.register(parsed);
    res.status(201).json(user);
};
exports.register = register;
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const login = async (req, res) => {
    const parsed = loginSchema.parse(req.body);
    const tokens = await authService.login(parsed.email, parsed.password);
    res.json(tokens);
};
exports.login = login;
const refresh = async (req, res) => {
    const { token } = req.body;
    const tokens = await authService.refresh(token);
    res.json(tokens);
};
exports.refresh = refresh;
const logout = async (req, res) => {
    const { token } = req.body;
    await authService.logout(token);
    res.status(204).send();
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    // implement email send
    res.json({ ok: true });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    res.json({ ok: true });
};
exports.resetPassword = resetPassword;
