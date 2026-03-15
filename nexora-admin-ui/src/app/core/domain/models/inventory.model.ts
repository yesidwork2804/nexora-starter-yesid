export type InventoryMovementType = 'IN' | 'OUT' | 'ADJUSTMENT'

export interface InventoryMovement {
  id: number
  productId: number
  type: InventoryMovementType
  quantity: number
  reason: string
  createdAt: string
}

export interface StockLevel {
  productId: number
  sku: string
  currentStock: number
  reservedStock: number
  availableStock: number
  reorderPoint: number
}
