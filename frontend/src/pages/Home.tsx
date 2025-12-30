import { Link } from 'react-router-dom'
import { ShoppingBag, Shield, Truck, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Modern E-Commerce
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Shop the latest trends
          and enjoy a seamless shopping experience.
        </p>
        <Link to="/products" className="btn btn-primary text-lg px-8 py-3">
          Shop Now
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6">
          <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Free Shipping
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            On orders over $50
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Secure Payment
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            100% secure transactions
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Quality Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Carefully curated items
          </p>
        </div>

        <div className="text-center p-6">
          <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Easy Returns
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            30-day return policy
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Shopping Today
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of satisfied customers
        </p>
        <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
          Create Account
        </Link>
      </section>
    </div>
  )
}
