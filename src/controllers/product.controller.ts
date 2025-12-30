import { Request, Response, NextFunction } from 'express'
import * as productService from '../services/product.service'

export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query
    const result = await productService.list(q)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body
    const product = await productService.create(payload)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await productService.update(req.params.id, req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.remove(req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
