/**
 * Product Context
 * Manages product data fetched from the Final Bell API
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "./CartContext";
import { fetchProducts } from "../services/api";
import { mapBackendProducts } from "../utils/productMapper";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const backendProducts = await fetchProducts();
      const mappedProducts = mapBackendProducts(backendProducts);

      setProducts(mappedProducts);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError(err instanceof Error ? err.message : "Failed to load products");
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const refreshProducts = async () => {
    await loadProducts();
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
