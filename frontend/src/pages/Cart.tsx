import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Add some products to get started
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const imageUrl = item.product.images?.[0]?.url || 'https://via.placeholder.com/100x100?text=No+Image'
          
          return (
            <div key={item.product.id} className="card flex items-center space-x-6">
              <img
                src={imageUrl}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {item.product.title}
                </Link>
                <p className="text-gray-600 dark:text-gray-400">
                  ${item.product.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                    disabled={item.quantity >= item.product.stockQty}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="min-w-[6rem] text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-3xl font-bold text-primary-600">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>

        <button className="btn btn-primary w-full text-lg py-3">
          Proceed to Checkout
        </button>

        <Link
          to="/products"
          className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
