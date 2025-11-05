/**
 * Product Import Script
 * Converts Playwell CSV to our product format
 *
 * Usage: ts-node scripts/importProducts.ts
 */

import * as fs from "fs";
import * as path from "path";
import {
  parseCSV,
  groupProductsByHandle,
  filterProductsByType,
  type ParsedProduct,
} from "../src/lib/csvParser";

// Category mapping from Playwell types to our categories
const CATEGORY_MAPPING: Record<string, string> = {
  "Boxing Gloves": "Boxing Gloves",
  "Mixed Martial Arts And Grappling Gloves": "MMA Gloves",
  "Muay Thai Shorts": "shorts",
  "Boxing Shorts": "shorts",
  "Head Guards": "protection",
  "Shin Guards": "protection",
  "Groin Guards": "protection",
  "Body Protection": "protection",
  "Hand Wraps": "accessories",
  "Punch Bags": "accessories",
  "Training Equipment": "accessories",
  "Skipping Ropes": "accessories",
};

// Size mapping
function mapSizeToOurFormat(
  optionName: string,
  optionValue: string
): string | undefined {
  const name = optionName.toLowerCase();
  const value = optionValue.toLowerCase();

  // Map glove weights
  if (name === "gloves" || value.includes("oz")) {
    const match = value.match(/(\d+)\s*oz/);
    if (match) return `${match[1]}oz`;
  }

  // Map clothing sizes
  if (name === "size") {
    const sizeMap: Record<string, string> = {
      "x - small": "XS",
      "small": "S",
      "medium": "M",
      "large": "L",
      "x - large": "XL",
      "xx - large": "XXL",
      "xxx - large": "XXXL",
    };
    return sizeMap[value] || optionValue;
  }

  return optionValue;
}

// Determine badge based on tags and inventory
function determineBadge(
  product: ParsedProduct
): "hot" | "sale" | "new" | undefined {
  const tags = product.tags.map((t) => t.toLowerCase());

  if (tags.includes("hot") || tags.includes("bestseller")) return "hot";
  if (tags.includes("sale") || tags.includes("clearance")) return "sale";
  if (tags.includes("new") || tags.includes("new arrival")) return "new";

  // Check if any variant has a compare at price (indicating sale)
  const hasComparePrice = product.variants.some((v) => v.compareAtPrice);
  if (hasComparePrice) return "sale";

  return undefined;
}

// Map category
function mapCategory(playwellType: string): string {
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (playwellType.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "accessories"; // Default category
}

// Product output type
interface ConvertedProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  specialPrice?: number;
  image: string;
  description: string;
  inStock: boolean;
  badge?: "hot" | "sale" | "new";
  brand: string;
  hasSizes?: boolean;
  sizes?: string[];
  weight: number;
  sku: string;
  variants: Array<{
    sku: string;
    size?: string;
    price: number;
    compareAtPrice?: number;
    inventoryQty: number;
    inStock: boolean;
  }>;
  images: string[];
  tags: string[];
}

// Convert parsed product to our format
function convertToOurFormat(products: ParsedProduct[], startId: number = 1) {
  const converted: ConvertedProduct[] = [];
  let currentId = startId;

  products.forEach((product) => {
    if (product.variants.length === 0) return;

    const category = mapCategory(product.type);
    const badge = determineBadge(product);

    // Get base variant (first variant or cheapest)
    const baseVariant = product.variants.reduce((min, v) =>
      v.price < min.price ? v : min
    );

    // Check if product has multiple sizes
    const hasSizes =
      product.variants.length > 1 &&
      product.variants[0].option1Name !== "Title";

    // Extract sizes if available
    const sizes = hasSizes
      ? product.variants
          .map((v) => mapSizeToOurFormat(v.option1Name, v.option1Value))
          .filter((s): s is string => s !== undefined)
      : undefined;

    // Check for special price (if any variant has compareAtPrice)
    const specialPrice = baseVariant.compareAtPrice
      ? baseVariant.price
      : undefined;
    const price = baseVariant.compareAtPrice || baseVariant.price;

    converted.push({
      id: currentId++,
      name: product.title,
      category,
      price,
      specialPrice,
      image: product.images[0] || "",
      description: product.description.substring(0, 150), // Limit description
      inStock: baseVariant.inStock,
      badge,
      brand: product.vendor,
      hasSizes,
      sizes,
      weight: baseVariant.weightGrams,
      sku: baseVariant.sku,
      variants: product.variants.map((v) => ({
        sku: v.sku,
        size: mapSizeToOurFormat(v.option1Name, v.option1Value),
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        inventoryQty: v.inventoryQty,
        inStock: v.inStock,
      })),
      images: product.images,
      tags: product.tags,
    });
  });

  return converted;
}

// Main import function
async function importProducts() {
  console.log("Starting product import...");

  // Read CSV file
  const csvPath = path.join(
    __dirname,
    "../src/assets/playwell-stock-shopify-b.csv"
  );

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  console.log("Reading CSV file...");
  const csvText = fs.readFileSync(csvPath, "utf-8");

  console.log("Parsing CSV...");
  const rows = parseCSV(csvText);
  console.log(`Parsed ${rows.length} CSV rows`);

  console.log("Grouping products...");
  const allProducts = groupProductsByHandle(rows);
  console.log(`Found ${allProducts.length} unique products`);

  // Filter to only include relevant categories
  const relevantTypes = [
    "Boxing Gloves",
    "Mixed Martial Arts",
    "Muay Thai Shorts",
    "Boxing Shorts",
    "Head Guard",
    "Shin Guard",
    "Hand Wrap",
    "Punch Bag",
    "Skipping Ropes",
  ];

  console.log("Filtering relevant products...");
  const filteredProducts = filterProductsByType(allProducts, relevantTypes);
  console.log(`Filtered to ${filteredProducts.length} relevant products`);

  // Convert to our format
  console.log("Converting to our format...");
  const convertedProducts = convertToOurFormat(filteredProducts);

  // Generate categories from products
  const categorySet = new Set(convertedProducts.map((p) => p.category));
  const categories = Array.from(categorySet).map((catId) => {
    const sampleProduct = convertedProducts.find((p) => p.category === catId);
    return {
      id: catId,
      name: catId,
      description: `${catId} for all levels`,
      image: sampleProduct?.image || "",
    };
  });

  // Write output
  const outputPath = path.join(
    __dirname,
    "../src/data/products-generated.ts"
  );

  const output = `/**
 * Auto-generated products from Playwell CSV
 * Generated: ${new Date().toISOString()}
 * Total products: ${convertedProducts.length}
 */

import type { Product } from "../contexts/CartContext";

export const products: Product[] = ${JSON.stringify(convertedProducts, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};
`;

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`\nProducts written to: ${outputPath}`);
  console.log(`Total products: ${convertedProducts.length}`);
  console.log(`Categories: ${categories.map((c) => c.name).join(", ")}`);

  // Generate summary
  console.log("\n--- Category Summary ---");
  categories.forEach((cat) => {
    const count = convertedProducts.filter((p) => p.category === cat.id).length;
    console.log(`${cat.name}: ${count} products`);
  });

  console.log("\nImport complete!");
}

// Run import
importProducts().catch((error) => {
  console.error("Import failed:", error);
  process.exit(1);
});
