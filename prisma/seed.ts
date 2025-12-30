import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'password123', 10)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      name: 'Admin',
      password,
      role: 'ADMIN'
    }
  })

  // Create categories
  const cat = await prisma.category.upsert({
    where: { name: 'Default' },
    update: {},
    create: { name: 'Default' }
  })

  const electronicsCategory = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics' }
  })

  // Create tags
  const newTag = await prisma.tag.upsert({
    where: { name: 'New' },
    update: {},
    create: { name: 'New' }
  })

  const featuredTag = await prisma.tag.upsert({
    where: { name: 'Featured' },
    update: {},
    create: { name: 'Featured' }
  })

  const saleTag = await prisma.tag.upsert({
    where: { name: 'Sale' },
    update: {},
    create: { name: 'Sale' }
  })

  // Create products with tags
  const p = await prisma.product.upsert({
    where: { sku: 'SAMPLE-001' },
    update: {},
    create: {
      title: 'Sample Product',
      description: 'This is a sample product',
      price: 19.99,
      sku: 'SAMPLE-001',
      categoryId: cat.id,
      stockQty: 100,
      tags: {
        connect: [{ id: newTag.id }, { id: featuredTag.id }]
      },
      variants: {
        create: [
          { sku: 'SAMPLE-001-RED', price: 19.99, stock: 50, attrs: { color: 'red' } },
          { sku: 'SAMPLE-001-BLUE', price: 19.99, stock: 50, attrs: { color: 'blue' } }
        ]
      }
    }
  })

  // Create a phone product
  const phone = await prisma.product.upsert({
    where: { sku: 'PHONE-001' },
    update: {},
    create: {
      title: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 799.99,
      sku: 'PHONE-001',
      categoryId: electronicsCategory.id,
      stockQty: 50,
      tags: {
        connect: [{ id: newTag.id }, { id: featuredTag.id }, { id: saleTag.id }]
      },
      variants: {
        create: [
          { sku: 'PHONE-001-BLACK', price: 799.99, stock: 25, attrs: { color: 'black', storage: '128GB' } },
          { sku: 'PHONE-001-WHITE', price: 799.99, stock: 25, attrs: { color: 'white', storage: '128GB' } }
        ]
      }
    }
  })

  console.log('Seed completed.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
