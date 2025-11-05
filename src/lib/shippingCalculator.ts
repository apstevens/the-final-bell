/**
 * Shipping Calculator for Playwell Products
 * Calculates shipping costs based on product weight and destination
 */

export type ShippingZone = "mainland" | "highlands" | "islands";

/**
 * Shipping rates for Mainland GB (weight in kg : price in GBP)
 */
const MAINLAND_RATES: [number, number][] = [
  [0.2, 2.99],
  [0.3, 4.35],
  [0.35, 4.35],
  [0.5, 4.65],
  [0.7, 4.65],
  [0.9, 4.99],
  [1, 6.79],
  [5, 7.5],
  [20, 13.99],
  [25, 13.99],
  [30, 13.99],
  [40, 14.99],
  [100, 15.99],
  [120, 16.99],
  [140, 17.99],
  [150, 18.99],
  [160, 19.99],
  [170, 20.99],
  [180, 21.99],
  [190, 22.99],
  [200, 23.99],
  [250, 39.99],
  [260, 66.99],
];

/**
 * Shipping rates for Highlands & Islands
 * Postcodes: HS, IV41-49, IV51, IV55, IV56, KA27, KA28, KW15-17, PA20, PA41-49, PA60-78,
 * PH42-44, GY, IM, ZE, JE, IV1-28, IV30-32, IV36-40, IV52-54, AB31-38, AB40-56, IV63,
 * KW1-14, PA21-38, PH4-41, PH49-50, BT
 */
const HIGHLANDS_RATES: [number, number][] = [
  [0.2, 2.5],
  [0.3, 4.6],
  [0.35, 5.55],
  [0.4, 5.75],
  [0.45, 5.95],
  [0.7, 7.99],
  [0.9, 7.99],
  [1, 18.99],
  [2, 24.99],
  [3, 24.99],
  [5, 26.99],
  [7, 26.99],
  [20, 26.99],
  [30, 27.99],
  [35, 34.0],
  [40, 35.99],
  [45, 35.0],
  [50, 39.99],
  [60, 55.99],
  [80, 65.99],
  [100, 80.0],
];

/**
 * Highland & Island postcode patterns
 */
const HIGHLAND_POSTCODES = [
  /^HS/i,
  /^IV(4[1-9]|5[1456])/i,
  /^KA2[78]/i,
  /^KW1[567]/i,
  /^PA(20|4[1-9]|[67]\d)/i,
  /^PH4[2-4]/i,
  /^GY/i,
  /^IM/i,
  /^ZE/i,
  /^JE/i,
  /^IV([1-2]\d|3[0-2]|3[68]|40|5[2-4]|63)/i,
  /^KW([1-9]|1[0-4])/i,
  /^PA(2[1-9]|3[0-8])/i,
  /^PH([4-9]|[1-3]\d|4[01]|49|50)/i,
  /^AB(3[1-8]|4[0-9]|5[0-6])/i,
  /^BT/i,
];

/**
 * Calculate shipping cost based on weight and destination
 */
export function calculateShipping(
  weightGrams: number,
  postcode?: string
): {
  cost: number;
  zone: ShippingZone;
  requiresQuote: boolean;
} {
  const weightKg = weightGrams / 1000;
  const zone = getShippingZone(postcode);
  const rates = zone === "mainland" ? MAINLAND_RATES : HIGHLANDS_RATES;

  // Find applicable rate
  let cost = 0;
  for (const [maxWeight, price] of rates) {
    if (weightKg <= maxWeight) {
      cost = price;
      break;
    }
  }

  // If weight exceeds all rates, use the highest rate and flag for quote
  const requiresQuote = cost === 0 || weightKg > 100;
  if (cost === 0) {
    cost = rates[rates.length - 1][1]; // Use highest rate as estimate
  }

  return {
    cost,
    zone,
    requiresQuote,
  };
}

/**
 * Calculate total shipping for multiple items (cart)
 */
export function calculateCartShipping(
  items: Array<{ weightGrams: number; quantity: number }>,
  postcode?: string
): {
  cost: number;
  zone: ShippingZone;
  requiresQuote: boolean;
  totalWeight: number;
} {
  const totalWeightGrams = items.reduce(
    (sum, item) => sum + item.weightGrams * item.quantity,
    0
  );

  const result = calculateShipping(totalWeightGrams, postcode);

  return {
    ...result,
    totalWeight: totalWeightGrams,
  };
}

/**
 * Determine shipping zone based on postcode
 */
export function getShippingZone(postcode?: string): ShippingZone {
  if (!postcode) return "mainland";

  const cleanPostcode = postcode.trim().toUpperCase().replace(/\s+/g, "");

  // Check if it matches Highland/Island patterns
  for (const pattern of HIGHLAND_POSTCODES) {
    if (pattern.test(cleanPostcode)) {
      return "highlands";
    }
  }

  return "mainland";
}

/**
 * Format shipping cost for display
 */
export function formatShippingCost(
  cost: number,
  requiresQuote: boolean
): string {
  if (requiresQuote) {
    return `From £${cost.toFixed(2)} (Quote required)`;
  }
  return `£${cost.toFixed(2)}`;
}

/**
 * Get shipping estimate message
 */
export function getShippingMessage(
  weightGrams: number,
  postcode?: string
): string {
  const { cost, zone, requiresQuote } = calculateShipping(weightGrams, postcode);

  if (requiresQuote) {
    return `This item may incur additional shipping charges due to its size or weight. Estimated shipping from £${cost.toFixed(
      2
    )}. We will contact you with a final quote.`;
  }

  const zoneText = zone === "highlands" ? " (Highlands & Islands)" : "";
  return `Shipping${zoneText}: £${cost.toFixed(2)}`;
}
