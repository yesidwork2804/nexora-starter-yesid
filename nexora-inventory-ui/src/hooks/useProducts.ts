import { useCallback, useEffect, useState } from "react";

import type { Product } from "../types/product";

type UseProductsResult = {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!apiUrl || String(apiUrl).trim().length === 0) {
        throw new Error(
          "Falta configurar VITE_API_URL. Revisa tu archivo .env y reinicia el servidor.",
        );
      }

      const res = await fetch(`${apiUrl}/api/products`);
      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");

      if (!res.ok) {
        if (isJson) {
          const body = (await res.json()) as { message?: string };
          throw new Error(
            body?.message ?? `Error al cargar productos (HTTP ${res.status})`,
          );
        }

        const bodyText = await res.text();
        throw new Error(
          bodyText?.trim()
            ? `Error al cargar productos (HTTP ${res.status}): ${bodyText}`
            : `Error al cargar productos (HTTP ${res.status})`,
        );
      }

      if (!isJson) {
        const bodyText = await res.text();
        throw new Error(
          bodyText?.trim()
            ? `La API respondió en un formato inesperado. Respuesta: ${bodyText}`
            : "La API respondió en un formato inesperado (no JSON).",
        );
      }

      const data = (await res.json()) as unknown;
      setProducts(data as Product[]);
    } catch (err: unknown) {
      if (err instanceof TypeError) {
        setError(
          "No se pudo conectar con la API. Verifica VITE_API_URL y tu conexión.",
        );
      } else {
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    products,
    loading,
    error,
    reload: load,
  };
}
