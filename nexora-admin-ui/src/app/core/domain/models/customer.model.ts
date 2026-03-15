export type CustomerTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'
export type CustomerStatus = 'ACTIVE' | 'INACTIVE'

export interface Customer {
  id: number
  code: string
  name: string
  email: string
  phone: string
  address: string
  tier: CustomerTier
  status: CustomerStatus
  totalOrders?: number
}
