import { Request, Response } from 'express'
import { z } from 'zod'
import * as authService from '../services/auth.service'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.parse(req.body)
  const user = await authService.register(parsed)
  res.status(201).json(user)
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.parse(req.body)
  const tokens = await authService.login(parsed.email, parsed.password)
  res.json(tokens)
}

export const refresh = async (req: Request, res: Response) => {
  const { token } = req.body
  const tokens = await authService.refresh(token)
  res.json(tokens)
}

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body
  await authService.logout(token)
  res.status(204).send()
}

export const forgotPassword = async (req: Request, res: Response) => {
  // implement email send
  res.json({ ok: true })
}

export const resetPassword = async (req: Request, res: Response) => {
  res.json({ ok: true })
}
