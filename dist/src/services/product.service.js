"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function list(query) {
    const page = Number(query.page || 1);
    const per = Number(query.perPage || 12);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where = {};
    if (query.category)
        where.category = { name: { equals: query.category } };
    if (query.q)
        where.title = { contains: String(query.q), mode: 'insensitive' };
    const total = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
        where,
        skip: (page - 1) * per,
        take: per,
        include: { variants: true, images: true }
    });
    return { total, page, per, products };
}
async function getById(id) {
    return prisma.product.findUnique({ where: { id }, include: { variants: true, images: true, reviews: true } });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function create(data) {
    return prisma.product.create({ data });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function update(id, data) {
    return prisma.product.update({ where: { id }, data });
}
async function remove(id) {
    return prisma.product.delete({ where: { id } });
}
