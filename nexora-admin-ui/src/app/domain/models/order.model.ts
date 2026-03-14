export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  productId: number
  quantity: number
  unitPrice: number
}

export interface Order {
  id: number
  orderNumber: string
  customerId: number
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
}
