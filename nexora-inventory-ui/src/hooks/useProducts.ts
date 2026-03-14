import { useCallback, useEffect, useState } from 'react'

import type { Product } from '../types/product'

type UseProductsResult = {
  products: Product[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL

  const load = useCallback(() => {
    setLoading(true)
    setError(null)

    fetch(`${apiUrl}/api/products`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos')
        return res.json()
      })
      .then((data: unknown) => {
        setProducts(data as Product[])
        setLoading(false)
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Error desconocido'
        setError(message)
        setLoading(false)
      })
  }, [apiUrl])

  useEffect(() => {
    load()
  }, [load])

  return {
    products,
    loading,
    error,
    reload: load,
  }
}
