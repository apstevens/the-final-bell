# Adding Products to the Catalogue

This guide explains how to add new product categories or types to your Final Bell Marketing shop.

## Overview

Products are automatically imported from the Playwell CSV feed. To add new product types, you need to:
1. Update the import script to recognize the new product type
2. Map it to the appropriate category
3. Re-import the products

## File Structure

```
final-bell-marketing/
├── scripts/
│   └── importProducts.mjs          # Main import script (JavaScript)
├── src/
│   ├── data/
│   │   ├── products.ts              # Category definitions
│   │   └── products-generated.ts    # Auto-generated products (DO NOT EDIT)
│   └── contexts/
│       └── CartContext.tsx          # Product type definition
```

## Step-by-Step Guide

### Step 1: Identify the Product Type in CSV

First, check what the product type is called in the Playwell CSV:

```bash
# Search for the product in the CSV
grep -i "product-name" "src/assets/playwell-stock-shopify-b.csv" | head -5
```

Look at the `Type` column to see what Playwell calls this product category.

**Example:**
```csv
Handle,Title,Type,...
1234,"PVC Skipping Rope","Skipping Ropes",...
```

### Step 2: Update the Import Script

Open `scripts/importProducts.mjs` and make these changes:

#### 2.1: Add to Category Mapping

Find the `CATEGORY_MAPPING` object (around line 16) and add your new type:

```javascript
const CATEGORY_MAPPING = {
  "Boxing Gloves": "Boxing Gloves",
  "Mixed Martial Arts And Grappling Gloves": "MMA Gloves",
  // ... existing mappings ...
  "Skipping Ropes": "accessories",  // ← Add your new type here
};
```

**Category Options:**
- `"Boxing Gloves"` - Boxing gloves
- `"MMA Gloves"` - MMA gloves
- `"shorts"` - Shorts
- `"shinguards"` - Shin guards
- `"protection"` - Protective gear
- `"accessories"` - Accessories (hand wraps, skipping ropes, etc.)
- `"pads"` - Training pads
- `"bags"` - Punch bags

#### 2.2: Add Keyword-Based Mapping (Optional)

If the product type name doesn't exactly match, you can add keywords to the `mapCategory` function (around line 275):

```javascript
// Check for accessories first (most specific items)
const accessoryKeywords = [
  "ankle support",
  "ankle wrap",
  "hand wrap inner",
  "gel hand wrap",
  "inner glove",
  "jump rope",
  "skipping rope",     // ← Add keywords here
  "speed rope",
];

if (accessoryKeywords.some((keyword) => title.includes(keyword))) {
  return "accessories";
}
```

#### 2.3: Add to Relevant Types Filter

Find the `relevantTypes` array (around line 469) and add your product type:

```javascript
const relevantTypes = [
  "Boxing Gloves",
  "Mixed Martial Arts",
  "Muay Thai Shorts",
  "Boxing Shorts",
  "Head Guard",
  "Shin Guard",
  "Shin Protection",
  // ... existing types ...
  "Skipping Ropes",  // ← Add your type here
];
```

### Step 3: Update TypeScript Types (If Adding New Category)

**Only needed if you're creating a completely new category (not just adding products to existing categories).**

Open `src/contexts/CartContext.tsx` and update the Product interface (line 12):

```typescript
export interface Product {
  id: number;
  name: string;
  category: "Boxing Gloves" | "MMA Gloves" | "shorts" | "shinguards" | "protection" | "accessories" | "pads" | "bags" | "your-new-category";
  // ... rest of interface
}
```

### Step 4: Add Category Definition (If New Category)

**Only needed if you're creating a completely new category.**

Open `src/data/products.ts` and add your category definition (around line 14):

```typescript
export const categories = [
  {
    id: "Boxing Gloves",
    name: "Boxing Gloves",
    description: "Professional boxing gloves from top brands",
    image: "https://www.playwell.co.uk/images/TWINSPINKGLOVES1.jpg",
  },
  // ... existing categories ...
  {
    id: "your-new-category",
    name: "Your New Category",
    description: "Description of your new category",
    image: "https://www.playwell.co.uk/images/category-image.jpg",
  },
];
```

### Step 5: Re-import Products

Run the import script to regenerate products:

```bash
cd final-bell-marketing
node scripts/importProducts.mjs
```

You should see output like:
```
Starting product import...
...
Total products: 632
--- Category Summary ---
Boxing Gloves: 212 products
accessories: 37 products  ← Your new products here
...
Import complete!
```

### Step 6: Verify and Build

Check that everything compiles:

```bash
npm run build
```

If successful, your new products are now available!

## Common Examples

### Example 1: Adding Skipping Ropes

```javascript
// 1. Add to CATEGORY_MAPPING
"Skipping Ropes": "accessories",

// 2. Add to accessoryKeywords
const accessoryKeywords = [
  // ... existing keywords
  "skipping rope",
  "jump rope",
  "speed rope",
];

// 3. Add to relevantTypes
const relevantTypes = [
  // ... existing types
  "Skipping Ropes",
];

// 4. Run import
node scripts/importProducts.mjs
```

### Example 2: Adding Gym Equipment to New Category

```javascript
// 1. Update CartContext.tsx category type
category: "Boxing Gloves" | "MMA Gloves" | "shorts" | "shinguards" | "protection" | "accessories" | "pads" | "bags" | "gym-equipment";

// 2. Add to CATEGORY_MAPPING
"Gym Equipment": "gym-equipment",
"Weight Training": "gym-equipment",

// 3. Add to relevantTypes
const relevantTypes = [
  // ... existing types
  "Gym Equipment",
  "Weight Training",
];

// 4. Add category definition in products.ts
{
  id: "gym-equipment",
  name: "Gym Equipment",
  description: "Training equipment and gym accessories",
  image: "https://www.playwell.co.uk/images/gym-equipment.jpg",
}

// 5. Run import
node scripts/importProducts.mjs
```

### Example 3: Moving Products Between Categories

If a product is in the wrong category, you can:

1. Check what keywords are matching it
2. Adjust the keyword priority in `mapCategory` function
3. The order matters - keywords are checked in this order:
   - Accessories keywords (checked first)
   - Protection keywords
   - Shin guard keywords
   - Pads keywords
   - Then CATEGORY_MAPPING

**Example:** Moving thigh pads from shin guards to protection:

```javascript
// Add "thigh pad" to protection keywords BEFORE shin guard check
const protectionKeywords = [
  "thigh pad",      // ← Add this
  "knee pad",
  "forearm guard",
  // ... rest
];
```

## Automatic CSV Sync

The backend automatically downloads the latest CSV from Playwell daily:

1. **Automatic sync**: Runs every 24 hours
2. **Manual sync**: `POST /admin/csv/sync` (requires admin JWT)
3. **Cron sync**: `POST /admin/csv/sync-cron` (requires API key)

After CSV sync on backend, you need to:

```bash
# 1. Copy CSV from backend to frontend
cp ../final-bell-api/data/playwell-stock-shopify-b.csv src/assets/

# 2. Run import script
node scripts/importProducts.mjs

# 3. Build frontend
npm run build
```

See [CSV-SYNC-SETUP.md](../final-bell-api/CSV-SYNC-SETUP.md) for full automation details.

## Troubleshooting

### Products Not Appearing

1. **Check CSV**: Verify the product exists in the CSV
   ```bash
   grep -i "product-name" "src/assets/playwell-stock-shopify-b.csv"
   ```

2. **Check Type**: Look at the `Type` column in the CSV - does it match your mapping?

3. **Check Relevant Types**: Is the type included in the `relevantTypes` filter?

4. **Check Import Output**: Look for your category in the summary:
   ```
   --- Category Summary ---
   accessories: 37 products  ← Should show your products
   ```

### TypeScript Errors

If you see "Type 'string' is not assignable to type..." errors:

1. Make sure you updated the Product interface in `CartContext.tsx`
2. The category string must exactly match what you added to the union type
3. Run `npm run build` to check for errors

### Products in Wrong Category

1. Check the keyword order in `mapCategory` function
2. Keywords checked earlier take priority
3. Move keywords higher in the list to increase priority
4. Re-run the import script after changes

## Quick Reference

```bash
# Search for product type in CSV
grep -i "keyword" "src/assets/playwell-stock-shopify-b.csv" | head -5

# Re-import products
node scripts/importProducts.mjs

# Check TypeScript
npx tsc --noEmit

# Build project
npm run build

# Copy CSV from backend
cp ../final-bell-api/data/playwell-stock-shopify-b.csv src/assets/
```

## Notes

- **DO NOT** manually edit `src/data/products-generated.ts` - it will be overwritten
- Always edit `scripts/importProducts.mjs` to change how products are imported
- The `.mjs` file is JavaScript (ES Modules), not TypeScript
- Category IDs must be lowercase for consistency
- Product images come from Playwell's CDN automatically

## Support

For issues:
1. Check this documentation
2. Review the import script output for errors
3. Verify CSV contains the products you expect
4. Check TypeScript compilation: `npx tsc --noEmit`

---

**Last Updated:** 2025-11-04
**Version:** 1.0.0
