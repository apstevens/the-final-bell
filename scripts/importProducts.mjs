/**
 * Product Import Script (ES Module version)
 * Converts Playwell CSV to our product format
 *
 * Usage: node scripts/importProducts.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Category mapping
const CATEGORY_MAPPING = {
  "Boxing Gloves": "Boxing Gloves",
  "Mixed Martial Arts And Grappling Gloves": "MMA Gloves",
  "Muay Thai Shorts": "shorts",
  "Boxing Shorts": "shorts",
  "Head Guards": "protection",
  "Shin Guards": "shinguards",
  "Shin Protection": "shinguards",
  "Lower Body Protection": "shinguards",
  "Shin and Forearm Protection": "shinguards",
  "Groin Guards": "protection",
  "Body Protection": "protection",
  "Muay Thai Body Shields & Belly Pads": "protection",
  "Chest Guards and Body Armour": "protection",
  "WT Approved Taekwondo Protective Equipment": "protection",
  "Hand Wraps": "accessories",
  "Punch Bags": "bags",
  "Training Equipment": "accessories",
  "Focus Pads": "pads",
  "Focus Mitts": "pads",
  "Thai Kick Pads": "pads",
  "Strike Shields And Kick Pads": "pads",
  "Strike Shields": "pads",
  "Kick Pads": "pads",
  "Belly Pads": "pads",
  "Training Pads": "pads",
  "Skipping Ropes": "accessories",
};

// Parse CSV line
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

// Parse CSV (handles multi-line fields within quotes)
function parseCSV(csvText) {
  // Normalize line endings
  csvText = csvText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const rows = [];
  let currentRow = "";
  let inQuotes = false;

  // Split into lines while respecting quotes
  const lines = [];
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      currentRow += char;
    } else if (char === '\n' && !inQuotes) {
      if (currentRow.trim()) {
        lines.push(currentRow);
      }
      currentRow = "";
    } else {
      currentRow += char;
    }
  }
  if (currentRow.trim()) lines.push(currentRow);

  console.log(`Found ${lines.length} lines in CSV`);

  if (lines.length < 2) {
    console.log("Not enough lines in CSV");
    return [];
  }

  let headers = parseCSVLine(lines[0]);

  // Remove empty trailing columns from headers
  while (headers.length > 0 && headers[headers.length - 1].trim() === "") {
    headers.pop();
  }

  console.log(`Found ${headers.length} headers (after removing empty)`)  ;
  console.log(`First few headers: ${headers.slice(0, 5).join(", ")}`);

  let skipped = 0;
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    // Pad with empty strings if needed (for rows with trailing commas)
    while (values.length < headers.length) {
      values.push("");
    }

    if (values.length !== headers.length) {
      if (skipped < 5) {
        console.log(`Row ${i}: Expected ${headers.length} columns, got ${values.length}`);
      }
      skipped++;
      continue;
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    rows.push(row);
  }

  console.log(`Skipped ${skipped} rows due to column count mismatch`);
  return rows;
}

// Strip HTML
function stripHTML(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

// Group products
function groupProductsByHandle(rows) {
  const productsMap = new Map();

  rows.forEach((row) => {
    const handle = row.Handle;
    if (!handle) return;

    const isMainRow = !!row.Title;

    if (!productsMap.has(handle)) {
      if (!isMainRow) return;

      productsMap.set(handle, {
        handle,
        title: row.Title,
        description: stripHTML(row["Body (HTML)"]),
        vendor: row.Vendor,
        type: row.Type,
        tags: row.Tags ? row.Tags.split(",").map((t) => t.trim()) : [],
        published: row.Published === "TRUE",
        images: row["Image Src"] ? [row["Image Src"]] : [],
        variants: [],
      });
    }

    const product = productsMap.get(handle);

    if (row["Image Src"] && !product.images.includes(row["Image Src"])) {
      product.images.push(row["Image Src"]);
    }

    // Add variant if this row has variant data (even if it's not the main row with title)
    if (row["Variant SKU"]) {
      const variant = {
        sku: row["Variant SKU"],
        option1Name: row["Option1 Name"] || "Title",
        option1Value: row["Option1 Value"] || product.title,
        option2Name: row["Option2 Name"] || undefined,
        option2Value: row["Option2 Value"] || undefined,
        price: parseFloat(row["Variant Price"]) || 0,
        compareAtPrice: row["Variant Compare At Price"]
          ? parseFloat(row["Variant Compare At Price"])
          : undefined,
        weightGrams: parseInt(row["Variant Grams"]) || 0,
        inventoryQty: parseInt(row["Variant Inventory Qty"]) || 0,
        inStock: parseInt(row["Variant Inventory Qty"]) > 0,
        images: row["Variant Images"] ? [row["Variant Images"]] : [],
      };

      product.variants.push(variant);
    }
  });

  return Array.from(productsMap.values());
}

// Map size
function mapSizeToOurFormat(optionName, optionValue) {
  const name = optionName.toLowerCase();
  const value = optionValue.toLowerCase().trim();

  // Map glove weights (oz)
  if (name === "gloves" || value.includes("oz")) {
    const match = value.match(/(\d+)\s*oz/);
    if (match) return `${match[1]}oz`;
  }

  // Map clothing sizes
  if (name === "size") {
    const sizeMap = {
      "x - small": "XS",
      "x-small": "XS",
      "xsmall": "XS",
      "small": "S",
      "medium": "M",
      "large": "L",
      "x - large": "XL",
      "x-large": "XL",
      "xlarge": "XL",
      "x large": "XL",
      "xx - large": "XXL",
      "xx-large": "XXL",
      "xxlarge": "XXL",
      "xx large": "XXL",
      "xxx - large": "XXXL",
      "xxx-large": "XXXL",
      "xxxlarge": "XXXL",
      "xxx large": "XXXL",
      "large / xlarge": "L/XL",
      "large / x large": "L/XL",
      "large/xlarge": "L/XL",
      "large/x large": "L/XL",
    };
    return sizeMap[value] || optionValue;
  }

  return optionValue;
}

// Determine badge
function determineBadge(product) {
  const tags = product.tags.map((t) => t.toLowerCase());

  if (tags.includes("hot") || tags.includes("bestseller")) return "hot";
  if (tags.includes("sale") || tags.includes("clearance")) return "sale";
  if (tags.includes("new") || tags.includes("new arrival")) return "new";

  const hasComparePrice = product.variants.some((v) => v.compareAtPrice);
  if (hasComparePrice) return "sale";

  return undefined;
}

// Extract brand from product title
function extractBrand(title) {
  // Known brands - check if title starts with these
  const knownBrands = [
    "Twins",
    "Fairtex",
    "Venum",
    "RDX",
    "Everlast",
    "Adidas",
    "Nike",
    "Reebok",
    "Rival",
    "Cleto Reyes",
    "Winning",
    "Grant",
    "Ringside",
    "Title",
    "Hayabusa",
    "Yokkao",
    "Top King",
    "Boon",
    "Raja",
    "Metal Boxe",
    "Bad Boy",
    "Cage Rage",
    "UFC",
    "Fumetsu",
    "Bytomic",
    "Pro Box",
    "Lonsdale",
    "Carbon Claw",
    "Century",
    "Revgear",
    "Anthem",
    "Sandee",
    "Blitz",
    "TUFF",
    "Wacoku",
    "Tusah",
    "Tatami",
    "Sting",
    "Choi",
    "Wicked1",
  ];

  // Check if title starts with any known brand
  for (const brand of knownBrands) {
    if (title.toLowerCase().startsWith(brand.toLowerCase())) {
      return brand;
    }
  }

  // Words that are NOT brands (common generic words at start of titles)
  const notBrands = [
    "adults", "adult", "childrens", "children", "kids", "youth", "junior",
    "boxing", "mma", "muay", "thai", "karate", "taekwondo", "kickboxing",
    "leather", "synthetic", "vinyl", "cotton", "mesh",
    "full", "semi", "curved", "square", "round", "custom", "deluxe", "elite",
    "focus", "kick", "punch", "strike", "training", "professional", "coaching",
    "weighted", "elasticated", "dipped", "free", "small", "large",
    "pvc", "eva", "wtf", "wukf", "xxxl", "instructors",
  ];

  // Extract first word
  const firstWord = title.split(" ")[0];

  // Check if first word is a non-brand generic term
  if (notBrands.includes(firstWord.toLowerCase())) {
    return "Playwell";
  }

  // If first word looks like a brand (capitalized, not a number, reasonable length)
  if (firstWord && firstWord.length > 2 && firstWord.length < 20 && /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }

  // Fallback to Playwell if we can't determine brand
  return "Playwell";
}

// Map category
function mapCategory(playwellType, productTitle = "") {
  const title = productTitle.toLowerCase();

  // Check for accessories first (most specific items)
  const accessoryKeywords = [
    "ankle support",
    "ankle wrap",
    "hand wrap inner",
    "gel hand wrap",
    "inner glove",
    "jump rope",
    "skipping rope",
    "speed rope",
  ];

  if (accessoryKeywords.some((keyword) => title.includes(keyword))) {
    return "accessories";
  }

  // Check for body protection items that should be in "protection" (check before shin guards)
  const protectionKeywords = [
    "thigh pad",
    "knee pad",
    "forearm guard",
    "forearm protector",
    "belly pad",
    "body shield",
    "body protector",
    "body armour",
    "body armor",
    "chest guard",
    "chest protector",
    "rib guard",
    "belly protector",
    "head guard",
    "groin guard",
  ];

  if (protectionKeywords.some((keyword) => title.includes(keyword))) {
    return "protection";
  }

  // Check for shin guards (after protection to avoid thigh pad conflicts)
  const shinguardKeywords = [
    "shin guard",
    "shin instep",
    "shin pad",
    "shin protection",
  ];

  if (shinguardKeywords.some((keyword) => title.includes(keyword))) {
    return "shinguards";
  }

  // Check product title for pads/mitts that should be in "pads" category
  const padsKeywords = [
    "focus mitt",
    "focus pad",
    "punching mitt",
    "bag mitt",
    "strike shield",
    "training pad",
    "kick pad",
    "thai pad",
    "curved pad",
  ];

  if (padsKeywords.some((keyword) => title.includes(keyword))) {
    return "pads";
  }

  // Map based on Playwell type
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (playwellType.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return "accessories";
}

// Convert products
function convertToOurFormat(products, startId = 1) {
  const converted = [];
  let currentId = startId;

  products.forEach((product) => {
    if (product.variants.length === 0) return;

    const category = mapCategory(product.type, product.title);
    const badge = determineBadge(product);

    const baseVariant = product.variants.reduce((min, v) =>
      v.price < min.price ? v : min
    );

    // Check if product has real size variants (not just "Title")
    const hasRealSizes = product.variants.some(
      (v) => v.option1Name && v.option1Name.toLowerCase() !== "title"
    );

    const hasSizes = product.variants.length > 1 || hasRealSizes;

    const sizes = hasSizes
      ? product.variants
          .map((v) => {
            const mapped = mapSizeToOurFormat(v.option1Name, v.option1Value);
            return mapped;
          })
          .filter((s) => s !== undefined)
          .filter((s, index, self) => self.indexOf(s) === index) // Remove duplicates
          .sort((a, b) => {
            // Sort sizes in logical order
            const sizeOrder = {
              "XS": 0,
              "S": 1,
              "M": 2,
              "L": 3,
              "XL": 4,
              "XXL": 5,
              "XXXL": 6,
              "L/XL": 3.5,
            };

            // For glove weights (oz)
            const aOz = a.match(/(\d+)oz/);
            const bOz = b.match(/(\d+)oz/);
            if (aOz && bOz) {
              return parseInt(aOz[1]) - parseInt(bOz[1]);
            }

            // For clothing sizes
            const aOrder = sizeOrder[a] ?? 999;
            const bOrder = sizeOrder[b] ?? 999;
            if (aOrder !== bOrder) return aOrder - bOrder;

            // Fallback to alphabetical
            return a.localeCompare(b);
          })
      : undefined;

    const specialPrice = baseVariant.compareAtPrice ? baseVariant.price : undefined;
    const price = baseVariant.compareAtPrice || baseVariant.price;

    converted.push({
      id: currentId++,
      name: product.title,
      category,
      price,
      specialPrice,
      image: product.images[0] || "",
      description: product.description.substring(0, 150),
      inStock: baseVariant.inStock,
      stockQuantity: baseVariant.inventoryQty,
      badge,
      brand: extractBrand(product.title),
      hasSizes,
      sizes,
      weight: baseVariant.weightGrams,
      sku: baseVariant.sku,
    });
  });

  return converted;
}

// Main function
async function importProducts() {
  console.log("Starting product import...");

  const csvPath = join(__dirname, "../src/assets/playwell-stock-shopify-b.csv");

  if (!existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  console.log("Reading CSV file...");
  const csvText = readFileSync(csvPath, "utf-8");
  console.log(`CSV file size: ${csvText.length} characters`);

  console.log("Parsing CSV...");
  const rows = parseCSV(csvText);
  console.log(`Parsed ${rows.length} CSV rows`);

  if (rows.length > 0) {
    console.log("First row keys:", Object.keys(rows[0]));
    console.log("First row sample:", {
      Handle: rows[0].Handle,
      Title: rows[0].Title,
      Type: rows[0].Type,
    });
  }

  console.log("Grouping products...");
  const allProducts = groupProductsByHandle(rows);
  console.log(`Found ${allProducts.length} unique products`);

  const relevantTypes = [
    "Boxing Gloves",
    "Mixed Martial Arts",
    "Muay Thai Shorts",
    "Boxing Shorts",
    "Head Guard",
    "Shin Guard",
    "Shin Protection",
    "Lower Body Protection",
    "Shin and Forearm Protection",
    "Hand Wrap",
    "Focus Mitts",
    "Focus Pads",
    "Thai Kick Pads",
    "Strike Shields",
    "Kick Pads",
    "Belly Pads",
    "Body Shields",
    "Muay Thai Body Shields & Belly Pads",
    "Chest Guards and Body Armour",
    "WT Approved Taekwondo Protective Equipment",
    "Punch Bags",
    "Training Pads",
    "Skipping Ropes",
  ];

  console.log("Filtering relevant products...");
  const filteredProducts = allProducts.filter((p) =>
    relevantTypes.some((type) => p.type.toLowerCase().includes(type.toLowerCase()))
  );
  console.log(`Filtered to ${filteredProducts.length} relevant products`);

  console.log("Converting to our format...");
  const convertedProducts = convertToOurFormat(filteredProducts);

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

  const outputPath = join(__dirname, "../src/data/products-generated.ts");

  const output = `/**
 * Auto-generated products from Playwell CSV
 * Generated: ${new Date().toISOString()}
 * Total products: ${convertedProducts.length}
 */

import type { Product } from "../contexts/CartContext";

export const products: Product[] = ${JSON.stringify(convertedProducts, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};
`;

  writeFileSync(outputPath, output, "utf-8");
  console.log(`\nProducts written to: ${outputPath}`);
  console.log(`Total products: ${convertedProducts.length}`);

  console.log("\n--- Category Summary ---");
  categories.forEach((cat) => {
    const count = convertedProducts.filter((p) => p.category === cat.id).length;
    console.log(`${cat.name}: ${count} products`);
  });

  console.log("\nImport complete!");
}

importProducts().catch((error) => {
  console.error("Import failed:", error);
  process.exit(1);
});
