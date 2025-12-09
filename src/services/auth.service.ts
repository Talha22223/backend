import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret'
const ACCESS_EXPIRES = (process.env.JWT_ACCESS_EXP || '15m') as string | number
const REFRESH_EXPIRES = (process.env.JWT_REFRESH_EXP || '7d') as string | number

export async function register(data: { email: string; password: string; name?: string }) {
  const hashed = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({
    data: { email: data.email, password: hashed, name: data.name }
  })
  return { id: user.id, email: user.email, name: user.name }
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) throw new Error('Invalid credentials')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const access = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES as any })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refresh = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES as any })
  await prisma.refreshToken.create({
    data: { token: refresh, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) }
  })
  return { access, refresh }
}

export async function refresh(token: string) {
  const rt = await prisma.refreshToken.findUnique({ where: { token } })
  if (!rt || rt.revoked) throw new Error('Invalid refresh token')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = jwt.verify(token, JWT_SECRET)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const access = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES as any })
  return { access }
}

export async function logout(token: string) {
  await prisma.refreshToken.updateMany({ where: { token }, data: { revoked: true } })
}
