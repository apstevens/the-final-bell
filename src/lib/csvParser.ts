/**
 * CSV Parser for Playwell Product Feed
 * Parses the Shopify CSV format from Playwell
 */

export interface PlaywellCSVRow {
  Handle: string;
  Title: string;
  "Body (HTML)": string;
  Vendor: string;
  Type: string;
  Tags: string;
  Published: string;
  "Option1 Name": string;
  "Option1 Value": string;
  "Option2 Name": string;
  "Option2 Value": string;
  "Option3 Name": string;
  "Option3 Value": string;
  "Variant SKU": string;
  "Variant Grams": string;
  "Variant Inventory Tracker": string;
  "Variant Inventory Qty": string;
  "Variant Inventory Policy": string;
  "Variant Fulfillment Service": string;
  "Variant Price": string;
  "VAT Rate": string;
  "Variant Compare At Price": string;
  "Variant Requires Shipping": string;
  "Variant Taxable": string;
  "Variant Barcode": string;
  "Image Src": string;
  "Image Position": string;
  "Image Alt Text": string;
  "Gift Card": string;
  "SEO Title": string;
  "SEO Description": string;
  "Variant Images": string;
  "Variant Weight Unit": string;
  "Cost per item": string;
}

export interface ParsedProduct {
  handle: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  tags: string[];
  published: boolean;
  images: string[];
  variants: ProductVariant[];
}

export interface ProductVariant {
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
 * Parse CSV text into structured data
 */
export function parseCSV(csvText: string): PlaywellCSVRow[] {
  const lines = csvText.split("\n");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows: PlaywellCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    rows.push(row as unknown as PlaywellCSVRow);
  }

  return rows;
}

/**
 * Parse a single CSV line handling quotes and commas properly
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
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

/**
 * Group CSV rows by product handle into structured products
 */
export function groupProductsByHandle(rows: PlaywellCSVRow[]): ParsedProduct[] {
  const productsMap = new Map<string, ParsedProduct>();

  rows.forEach((row) => {
    const handle = row.Handle;
    if (!handle) return;

    // Check if this is a main product row (has title) or just additional images
    const isMainRow = !!row.Title;

    if (!productsMap.has(handle)) {
      // Create new product
      if (!isMainRow) return; // Skip if first row doesn't have title

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

    const product = productsMap.get(handle)!;

    // Add additional images
    if (row["Image Src"] && !product.images.includes(row["Image Src"])) {
      product.images.push(row["Image Src"]);
    }

    // Add variant if this row has variant data
    if (isMainRow && row["Variant SKU"]) {
      const variant: ProductVariant = {
        sku: row["Variant SKU"],
        option1Name: row["Option1 Name"] || "Title",
        option1Value: row["Option1 Value"] || row.Title,
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

/**
 * Strip HTML tags from description
 */
function stripHTML(html: string): string {
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

/**
 * Filter products by category type
 */
export function filterProductsByType(
  products: ParsedProduct[],
  types: string[]
): ParsedProduct[] {
  return products.filter((p) =>
    types.some((type) => p.type.toLowerCase().includes(type.toLowerCase()))
  );
}
