import { Link } from 'react-router-dom'
import { Product } from '../types'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast.success('Added to cart!')
  }

  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/300x300?text=No+Image'

  return (
    <div className="card group hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.stockQty <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <Link to={`/products/${product.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400">
          {product.title}
        </h3>
      </Link>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {product.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary-600">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddToCart}
          disabled={product.stockQty <= 0}
          className="btn btn-primary flex items-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      {product.stockQty > 0 && product.stockQty <= 10 && (
        <p className="text-orange-500 text-xs mt-2">
          Only {product.stockQty} left in stock!
        </p>
      )}
    </div>
  )
}
