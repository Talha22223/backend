import { Router } from 'express'
import * as productController from '../controllers/product.controller'

const router = Router()

router.get('/', productController.listProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.createProduct) // admin in real app
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
