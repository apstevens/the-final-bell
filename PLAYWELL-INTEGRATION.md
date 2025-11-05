# Playwell Product Integration Guide

This document explains how to import and manage products from the Playwell CSV feed.

## Overview

Your website now supports automatic product imports from the Playwell CSV file. This system includes:

1. **CSV Parser** - Parses the Shopify-format CSV from Playwell
2. **Product Import Script** - Converts CSV data to your product format
3. **Shipping Calculator** - Calculates shipping costs based on product weight
4. **Generated Products** - Auto-generated product database

## Import Statistics

**Last Import:** 2025-11-03
**Total Products:** 334 products

### Category Breakdown:
- **Boxing Gloves:** 214 products
- **MMA Gloves:** 39 products
- **Shorts:** 76 products
- **Protection:** 5 products

## Files Created

### Core Utilities
- `src/lib/csvParser.ts` - CSV parsing and product grouping utilities
- `src/lib/shippingCalculator.ts` - Shipping cost calculator based on weight

### Scripts
- `scripts/importProducts.mjs` - Product import script (Node.js ES Module)

### Generated Files
- `src/data/products-generated.ts` - Auto-generated product database

## How to Import Products

### Step 1: Update the CSV File

1. Download the latest CSV from Playwell's FTP server:
   - **Server:** ftp://161.35.45.163/
   - **File:** `playwell-stock-shopify-b.csv`
   - **Credentials:** (from your email)

2. Replace the CSV file in your project:
   ```
   src/assets/playwell-stock-shopify-b.csv
   ```

### Step 2: Run the Import Script

```bash
node scripts/importProducts.mjs
```

This will:
1. Parse the CSV file (12,000+ rows)
2. Group products by handle
3. Filter to relevant categories (Boxing, MMA, etc.)
4. Convert to your product format
5. Generate `src/data/products-generated.ts`

### Step 3: Use the Generated Products

Update your `src/data/products.ts` to import from the generated file:

```typescript
// Option 1: Replace completely
export { products, categories } from "./products-generated";

// Option 2: Merge with existing
import { products as generatedProducts, categories as generatedCategories } from "./products-generated";

export const products = [
  ...generatedProducts,
  // ... your custom products
];

export const categories = generatedCategories;
```

## Shipping Calculator

The shipping calculator automatically determines shipping costs based on:
- Product weight (in grams)
- Destination postcode
- Shipping zone (Mainland GB vs Highlands/Islands)

### Usage Example

```typescript
import { calculateShipping, getShippingMessage } from "../lib/shippingCalculator";

// Calculate shipping for a product
const product = { weight: 500 }; // 500g
const { cost, zone, requiresQuote } = calculateShipping(product.weight, "SW1A 1AA");

console.log(`Shipping: £${cost.toFixed(2)}`);
console.log(`Zone: ${zone}`);

// Get a user-friendly message
const message = getShippingMessage(product.weight, "SW1A 1AA");
console.log(message); // "Shipping: £4.65"
```

### Cart Shipping Example

```typescript
import { calculateCartShipping } from "../lib/shippingCalculator";

const cartItems = [
  { weightGrams: 350, quantity: 2 }, // 2x boxing gloves
  { weightGrams: 300, quantity: 1 }, // 1x shorts
];

const result = calculateCartShipping(cartItems, "SW1A 1AA");
console.log(`Total shipping: £${result.cost.toFixed(2)}`);
console.log(`Total weight: ${result.totalWeight}g`);
```

## Shipping Rates

### Mainland GB
| Weight (kg) | Cost (£) |
|-------------|----------|
| 0.20        | 2.99     |
| 0.30-0.35   | 4.35     |
| 0.50-0.70   | 4.65     |
| 0.90        | 4.99     |
| 1.00        | 6.79     |
| 5.00        | 7.50     |
| 20-30       | 13.99    |
| 100+        | Quote required |

### Highlands & Islands
Postcodes: HS, IV, KA27-28, KW, PA, PH, AB, BT, GY, IM, ZE, JE

| Weight (kg) | Cost (£) |
|-------------|----------|
| 0.20        | 2.50     |
| 0.30        | 4.60     |
| 0.70-0.90   | 7.99     |
| 1.00        | 18.99    |
| 5.00        | 26.99    |
| 100         | 80.00    |

**Note:** Large items (bo staffs, punch bags, etc.) may require a custom quote.

## Automation

### Daily Automatic Updates (Future Enhancement)

To set up automatic daily imports:

1. **Option A: Scheduled Task (Windows)**
   - Create a scheduled task to run `node scripts/importProducts.mjs` daily
   - Set it to run at a low-traffic time (e.g., 3 AM)

2. **Option B: GitHub Actions (if using GitHub)**
   - Create `.github/workflows/import-products.yml`
   - Schedule it to run daily and commit changes

3. **Option C: Server Cron Job (if deployed)**
   - Add to crontab: `0 3 * * * cd /path/to/project && node scripts/importProducts.mjs`

## Category Mapping

The import script maps Playwell categories to your categories:

| Playwell Type | Your Category |
|---------------|---------------|
| Boxing Gloves | Boxing Gloves |
| Mixed Martial Arts And Grappling Gloves | MMA Gloves |
| Muay Thai Shorts | shorts |
| Boxing Shorts | shorts |
| Head Guards | protection |
| Shin Guards | protection |
| Groin Guards | protection |
| Hand Wraps | accessories |
| Punch Bags | accessories |

## Product Fields

Each imported product includes:

```typescript
{
  id: number;                    // Sequential ID
  name: string;                  // Product title
  category: string;              // Mapped category
  price: number;                 // Base price (£)
  specialPrice?: number;         // Sale price if available
  image: string;                 // Primary image URL
  description: string;           // Truncated description (150 chars)
  inStock: boolean;              // Inventory availability
  badge?: "hot" | "sale" | "new"; // Product badge
  brand: string;                 // Vendor (usually "Playwell")
  hasSizes: boolean;             // Has multiple size options
  sizes?: string[];              // Available sizes if applicable
  weight: number;                // Product weight in grams
  sku: string;                   // Product SKU
}
```

## Important Notes

### Payment Method Restrictions

**CRITICAL:** For weapons products, you MUST remove these payment methods:
- PayPal
- Clearpay
- Klarna
- Any other "buy now, pay later" services

Failure to do so may result in account suspension by these providers.

### Inventory Management

The CSV updates hourly with:
- Current stock levels
- New products
- Price changes
- Product availability

Run the import script regularly (daily recommended) to keep your product database in sync.

## Troubleshooting

### CSV Not Parsing
- Check that the CSV is in `src/assets/playwell-stock-shopify-b.csv`
- Verify the CSV has the correct format (Shopify format)
- Check for encoding issues (should be UTF-8)

### No Products Imported
- Check the console output for errors
- Verify the category mapping includes your desired categories
- Check that products have inventory > 0

### Shipping Calculator Issues
- Verify product weights are in grams
- Check postcode format (uppercase, no spaces in middle)
- For quotes, contact customer with manual calculation

## Support

For issues with:
- **CSV Feed:** Contact Playwell support
- **Import Script:** Check console output for errors
- **Shipping Rates:** Refer to Playwell's email with rate tables
- **Payment Methods:** Check with your payment processor

---

**Last Updated:** 2025-11-03
**Script Version:** 1.0.0
