/**
 * API Service
 * Handles communication with the Final Bell API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface BackendProduct {
  handle: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string[];
  published: boolean;
  images: string[];
  variants: BackendVariant[];
}

export interface BackendVariant {
  sku: string;
  option1Name: string;
  option1Value: string;
  option2Name?: string;
  option2Value?: string;
  price: number;
  compareAtPrice?: number;
  weightGrams: number;
  inventoryQty: number;
  inStock: boolean;
  images: string[];
}

/**
 * Fetch all products from the API
 */
export async function fetchProducts(): Promise<BackendProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch products');
    }

    return result.data as BackendProduct[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch products by type/category
 */
export async function fetchProductsByType(type: string): Promise<BackendProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/type/${encodeURIComponent(type)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products by type: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch products by type');
    }

    return result.data as BackendProduct[];
  } catch (error) {
    console.error('Error fetching products by type:', error);
    throw error;
  }
}

/**
 * Fetch product by handle
 */
export async function fetchProductByHandle(handle: string): Promise<BackendProduct> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(handle)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch product');
    }

    return result.data as BackendProduct;
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    throw error;
  }
}

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string | null;
}

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(items: CheckoutItem[]): Promise<CheckoutSessionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create checkout session: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}
