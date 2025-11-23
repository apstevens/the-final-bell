import { createContext, useContext, useState, type ReactNode } from "react";

export type GloveSize = "8oz" | "10oz" | "12oz" | "14oz" | "16oz";
export type ClothingSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ShinguardSize = "S" | "M" | "L" | "XL";
export type HandWrapSize = "1m" | "2m";
export type MMAGloveSize = "Medium" | "Large" | "XL";

export interface ProductVariant {
  size: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventoryQty: number;
  inStock: boolean;
}

export interface Product {
  id: number;
  name: string;
  category:
    | "gloves"
    | "shorts"
    | "shinguards"
    | "protection"
    | "accessories"
    | "pads"
    | "bags";
  price: number;
  specialPrice?: number; // For sale/special pricing
  image: string;
  description: string;
  inStock: boolean;
  stockQuantity?: number; // Available stock quantity from CSV
  badge?: "new" | "sale" | "hot" | "featured"; // Product status badges
  brand?: string; // Product brand/manufacturer
  sizes?: string[]; // Available sizes (flexible to support various size formats from CSV)
  colors?: string[]; // Available colors
  hasSizes?: boolean; // Flag to indicate if product has size variants
  weight?: number; // Product weight in grams (for shipping calculation)
  sku?: string; // Product SKU from supplier
  variants?: ProductVariant[]; // Variant-level stock and pricing information
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Product["category"];
  quantity: number;
  selectedSize?: string;
  sku?: string;
  weight?: number;
  hasSizes?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (productId: number, selectedSize?: string) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart((prevCart) => {
      // For products with sizes, match both ID and size
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          (product.hasSizes ? item.selectedSize === selectedSize : true)
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          (product.hasSizes ? item.selectedSize === selectedSize : true)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Only store essential cart data (avoid circular references from variants)
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.specialPrice || product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
        selectedSize,
        sku: product.sku,
        weight: product.weight,
        hasSizes: product.hasSizes,
      };

      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (productId: number, selectedSize?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            (item.hasSizes ? item.selectedSize === selectedSize : true)
          )
      )
    );
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        (item.hasSizes ? item.selectedSize === selectedSize : true)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
