import apiClient from '../lib/axios'
import { Product } from '../types'

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}

export const productService = {
  async getProducts(page = 1, limit = 12, search?: string): Promise<ProductsResponse> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (search) params.append('search', search)

    const response = await apiClient.get<ProductsResponse>(`/api/products?${params}`)
    return response.data
  },

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/api/products/${id}`)
    return response.data
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await apiClient.post<Product>('/api/products', data)
    return response.data
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await apiClient.put<Product>(`/api/products/${id}`, data)
    return response.data
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/api/products/${id}`)
  },
}
