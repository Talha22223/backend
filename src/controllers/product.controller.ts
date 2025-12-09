import { Request, Response } from 'express'
import * as productService from '../services/product.service'

export const listProducts = async (req: Request, res: Response) => {
  const q = req.query
  const result = await productService.list(q)
  res.json(result)
}

export const getProduct = async (req: Request, res: Response) => {
  const product = await productService.getById(req.params.id)
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
  const payload = req.body
  const product = await productService.create(payload)
  res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  const updated = await productService.update(req.params.id, req.body)
  res.json(updated)
}

export const deleteProduct = async (req: Request, res: Response) => {
  await productService.remove(req.params.id)
  res.status(204).send()
}
