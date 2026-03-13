import { useState } from 'react'
import './App.css'

import { useProducts } from './hooks/useProducts'

// Sin interfaces tipadas para la respuesta de la API
// El fetch se hace directamente en el componente (deberia ser un custom hook)
// Usa 'any' para el tipo de los datos

function App() {
  const { products, loading, error, reload } = useProducts()
  const [filter, setFilter] = useState<string>('ALL')

  const filtered = products.filter((p) =>
    filter === 'ALL' ? true : p.status === filter
  )

  if (loading) return <div className="loading">Cargando productos...</div>
  if (error)   return (
    <div className="error">
      <div>Error: {error}</div>
      <button className="retry" onClick={reload}>Reintentar</button>
    </div>
  )

  return (
    <div className="container">
      <h1>Nexora — Inventory Dashboard</h1>

      <div className="filters">
        {['ALL', 'ACTIVE', 'INACTIVE', 'DISCONTINUED'].map(s => (
          <button
            key={s}
            className={filter === s ? 'active' : ''}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="success">
        Productos cargados: {products.length}
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <span className={`badge badge-${product.status?.toLowerCase()}`}>
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="empty">No hay productos con el filtro seleccionado.</p>
      )}
    </div>
  )
}

export default App
