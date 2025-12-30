export interface User {
  id: string
  email: string
  name?: string
  role: 'CUSTOMER' | 'ADMIN'
}

export interface Product {
  id: string
  title: string
  description?: string
  price: number
  sku?: string
  categoryId?: string
  stockQty: number
  images?: ProductImage[]
  category?: Category
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  key: string
}

export interface Category {
  id: string
  name: string
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  items: CartItem[]
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}
