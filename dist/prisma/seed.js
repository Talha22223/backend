"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const password = await bcrypt_1.default.hash(process.env.ADMIN_PASSWORD || 'password123', 10);
    await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            name: 'Admin',
            password,
            role: 'ADMIN'
        }
    });
    const cat = await prisma.category.upsert({
        where: { name: 'Default' },
        update: {},
        create: { name: 'Default' }
    });
    const p = await prisma.product.create({
        data: {
            title: 'Sample Product',
            description: 'This is a sample product',
            price: 19.99,
            sku: 'SAMPLE-001',
            categoryId: cat.id,
            stockQty: 100,
            variants: {
                create: [
                    { sku: 'SAMPLE-001-RED', price: 19.99, stock: 50, attrs: { color: 'red' } },
                    { sku: 'SAMPLE-001-BLUE', price: 19.99, stock: 50, attrs: { color: 'blue' } }
                ]
            }
        }
    });
    console.log('Seed completed.');
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
