/**
 * Shipping Information
 * Based on Playwell's shipping policy
 */

export interface ShippingRate {
  id: string;
  name: string;
  minWeight: number; // in grams
  maxWeight: number; // in grams
  cost: number; // in GBP
  estimatedDays: string;
}

/**
 * Shipping rates for UK mainland
 * Source: Playwell email (dated 2025-11-04)
 */
export const shippingRates: ShippingRate[] = [
  {
    id: "under-1kg",
    name: "Standard Delivery (Under 1kg)",
    minWeight: 0,
    maxWeight: 999,
    cost: 4.99,
    estimatedDays: "3-5 working days",
  },
  {
    id: "1-5kg",
    name: "Standard Delivery (1-5kg)",
    minWeight: 1000,
    maxWeight: 4999,
    cost: 6.99,
    estimatedDays: "3-5 working days",
  },
  {
    id: "5-10kg",
    name: "Standard Delivery (5-10kg)",
    minWeight: 5000,
    maxWeight: 9999,
    cost: 8.99,
    estimatedDays: "3-5 working days",
  },
  {
    id: "10-20kg",
    name: "Standard Delivery (10-20kg)",
    minWeight: 10000,
    maxWeight: 19999,
    cost: 12.99,
    estimatedDays: "3-5 working days",
  },
  {
    id: "over-20kg",
    name: "Standard Delivery (Over 20kg)",
    minWeight: 20000,
    maxWeight: Infinity,
    cost: 19.99,
    estimatedDays: "3-5 working days",
  },
];

/**
 * Calculate shipping cost based on total cart weight
 * @param weightInGrams Total weight in grams
 * @returns Shipping rate object
 */
export function calculateShipping(weightInGrams: number): ShippingRate {
  const rate = shippingRates.find(
    (r) => weightInGrams >= r.minWeight && weightInGrams <= r.maxWeight
  );

  // Fallback to heaviest rate if weight exceeds all ranges
  return rate || shippingRates[shippingRates.length - 1];
}

/**
 * Free shipping threshold
 */
export const FREE_SHIPPING_THRESHOLD = 100; // £100

/**
 * Shipping policy details
 */
export const shippingPolicy = {
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  ukMainlandOnly: true,
  estimatedDelivery: "3-5 working days",
  courierService: "DPD / Royal Mail",
  trackingAvailable: true,
  saturdayDelivery: false,
  processingTime: "Orders dispatched within 1-2 working days",
  restrictions: [
    "Delivery to UK mainland addresses only",
    "PO Box addresses may incur additional charges",
    "Remote area postcodes may take longer",
  ],
  paymentRestrictions: [
    "Amex not accepted (high processing fees)",
    "PayPal accepted for all transactions",
    "Credit/Debit cards accepted (Visa, Mastercard)",
  ],
};

/**
 * Format weight for display
 */
export function formatWeight(weightInGrams: number): string {
  if (weightInGrams < 1000) {
    return `${weightInGrams}g`;
  }
  return `${(weightInGrams / 1000).toFixed(1)}kg`;
}
