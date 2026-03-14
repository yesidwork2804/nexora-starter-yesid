export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED'

export interface Product {
  id: number
  sku: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  status: ProductStatus
  createdAt?: string
}
