import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import { productService } from '../services/productService'
import { useCartStore } from '../stores/cartStore'
import { Product } from '../types'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartStore()

  useEffect(() => {
    if (id) {
      loadProduct(id)
    }
  }, [id])

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true)
      const data = await productService.getProduct(productId)
      setProduct(data)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load product')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast.success(`Added ${quantity} item(s) to cart!`)
    }
  }

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 dark:text-gray-400 text-lg">Product not found</p>
      </div>
    )
  }

  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/600x600?text=No+Image'

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Products</span>
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h1>
            {product.category && (
              <p className="text-primary-600 font-medium">
                {product.category.name}
              </p>
            )}
          </div>

          <div className="text-4xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {product.description || 'No description available'}
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Stock:</span>
            <span
              className={`font-semibold ${
                product.stockQty > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.stockQty > 0 ? `${product.stockQty} available` : 'Out of stock'}
            </span>
          </div>

          {product.sku && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQty, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={quantity >= product.stockQty}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stockQty <= 0}
              className="btn btn-primary w-full flex items-center justify-center space-x-2 text-lg py-3"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
