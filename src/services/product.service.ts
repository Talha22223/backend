import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function list(query: any) {
  const page = Number(query.page || 1)
  const per = Number(query.perPage || 12)
  const where: any = {}
  if (query.category) where.category = { name: { equals: query.category } }
  if (query.q) where.title = { contains: String(query.q), mode: 'insensitive' }
  const total = await prisma.product.count({ where })
  const products = await prisma.product.findMany({
    where,
    skip: (page - 1) * per,
    take: per,
    include: { variants: true, images: true }
  })
  return { total, page, per, products }
}

export async function getById(id: string) {
  return prisma.product.findUnique({ where: { id }, include: { variants: true, images: true, reviews: true } })
}

export async function create(data: any) {
  return prisma.product.create({ data })
}

export async function update(id: string, data: any) {
  return prisma.product.update({ where: { id }, data })
}

export async function remove(id: string) {
  return prisma.product.delete({ where: { id } })
}
