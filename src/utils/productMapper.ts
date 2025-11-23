/**
 * Product Mapper
 * Transforms backend product format to frontend Product format
 */

import type { Product } from "../contexts/CartContext";
import type { BackendProduct } from "../services/api";

// Category mapping from backend product types to frontend categories
const CATEGORY_MAPPING: Record<string, Product["category"]> = {
  // Boxing Gloves - all map to "gloves"
  "Boxing Gloves": "gloves",
  "Lace-Up Boxing Gloves": "gloves",
  "Velcro Boxing Gloves": "gloves",
  "Bag Gloves": "gloves",

  // MMA Gloves - also map to "gloves"
  "Mixed Martial Arts And Grappling Gloves": "gloves",
  "MMA Fight Gloves": "gloves",
  "MMA Sparring Gloves": "gloves",
  "MMA Gloves": "gloves",

  // Shorts
  "Muaythai Shorts": "shorts",
  "MMA Shorts": "shorts",
  "Boxing Shorts": "shorts",
  "Vale Tudo Shorts": "shorts",

  // Protection
  "Head Guards": "protection",
  "Head Protection": "protection",
  "Groin Guards": "protection",
  "Body Protection": "protection",
  "Body Pads": "protection",
  "Belly Pads": "pads",
  "Muay Thai Body Shields & Belly Pads": "protection",
  "Chest Guards and Body Armour": "protection",
  "WT Approved Taekwondo Protective Equipment": "protection",
  "Elbow Pads": "protection",
  "Knee Pads": "protection",

  // Shin Guards
  "Shin Guards": "shinguards",
  "Shin Protection": "shinguards",
  "Lower Body Protection": "shinguards",
  "Shin and Forearm Protection": "shinguards",
  "Competition Shin Pads": "shinguards",
  "Shin Pads": "shinguards",

  // Accessories
  "Hand Wraps": "accessories",
  "Training Equipment": "accessories",
  "Skipping Ropes": "accessories",
  "Ankle Supports": "accessories",
  "Deodorisers": "accessories",

  // Bags
  "Punch Bags": "bags",
  "Filled": "bags",
  "Un-Filled": "bags",

  // Pads
  "Focus Pads": "pads",
  "Focus Mitts": "pads",
  "Thai Kick Pads": "pads",
  "Strike Shields And Kick Pads": "pads",
  "Strike Shields": "pads",
  "Kick Pads": "pads",
  "Training Pads": "pads",
  "Thai Pads": "pads",
};

/**
 * Map backend product type to frontend category
 */
function mapCategory(backendType: string, productTitle: string = ""): Product["category"] {
  const title = productTitle.toLowerCase();

  // Check for accessories first
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

  // Check for protection items
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

  // Check for shin guards
  const shinguardKeywords = [
    "shin guard",
    "shin instep",
    "shin pad",
    "shin protection",
  ];

  if (shinguardKeywords.some((keyword) => title.includes(keyword))) {
    return "shinguards";
  }

  // Check for pads
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

  // Map based on backend type
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (backendType.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return "accessories";
}

/**
 * Extract brand from product title
 */
function extractBrand(title: string): string {
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

  // Extract first word
  const firstWord = title.split(" ")[0];

  // Words that are NOT brands
  const notBrands = [
    "adults", "adult", "childrens", "children", "kids", "youth", "junior",
    "boxing", "mma", "muay", "thai", "karate", "taekwondo", "kickboxing",
    "leather", "synthetic", "vinyl", "cotton", "mesh",
    "full", "semi", "curved", "square", "round", "custom", "deluxe", "elite",
    "focus", "kick", "punch", "strike", "training", "professional", "coaching",
    "weighted", "elasticated", "dipped", "free", "small", "large",
    "pvc", "eva", "wtf", "wukf", "xxxl", "instructors",
  ];

  if (notBrands.includes(firstWord.toLowerCase())) {
    return "muaythai-boxing.com";
  }

  // If first word looks like a brand
  if (firstWord && firstWord.length > 2 && firstWord.length < 20 && /^[A-Z]/.test(firstWord)) {
    return firstWord;
  }

  return "muaythai-boxing.com";
}

/**
 * Map size to standard format
 */
function mapSizeToOurFormat(optionName: string, optionValue: string): string {
  const name = optionName.toLowerCase();
  const value = optionValue.toLowerCase().trim();

  // Map glove weights (oz)
  if (name === "gloves" || value.includes("oz")) {
    const match = value.match(/(\d+)\s*oz/);
    if (match) return `${match[1]}oz`;
  }

  // Map clothing sizes
  if (name === "size") {
    const sizeMap: Record<string, string> = {
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

/**
 * Determine badge from tags and pricing
 */
function determineBadge(backendProduct: BackendProduct): Product["badge"] {
  const tags = backendProduct.tags.map((t) => t.toLowerCase());

  if (tags.includes("hot") || tags.includes("bestseller")) return "hot";
  if (tags.includes("sale") || tags.includes("clearance")) return "sale";
  if (tags.includes("new") || tags.includes("new arrival")) return "new";

  const hasComparePrice = backendProduct.variants.some((v) => v.compareAtPrice);
  if (hasComparePrice) return "sale";

  return undefined;
}

/**
 * Transform backend product to frontend Product format
 */
export function mapBackendProduct(backendProduct: BackendProduct, id: number): Product {
  if (backendProduct.variants.length === 0) {
    throw new Error(`Product ${backendProduct.handle} has no variants`);
  }

  const category = mapCategory(backendProduct.type, backendProduct.title);
  const badge = determineBadge(backendProduct);

  // Get the base variant (lowest price)
  const baseVariant = backendProduct.variants.reduce((min, v) =>
    v.price < min.price ? v : min
  );

  // Check if product has real size variants
  const hasRealSizes = backendProduct.variants.some(
    (v) => v.option1Name && v.option1Name.toLowerCase() !== "title"
  );

  const hasSizes = backendProduct.variants.length > 1 || hasRealSizes;

  // Map variants with stock information
  const variants = hasSizes
    ? backendProduct.variants.map((v) => ({
        size: mapSizeToOurFormat(v.option1Name, v.option1Value),
        sku: v.sku,
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        inventoryQty: v.inventoryQty,
        inStock: v.inStock,
      }))
    : undefined;

  // Extract and sort sizes
  const sizes = hasSizes
    ? backendProduct.variants
        .map((v) => mapSizeToOurFormat(v.option1Name, v.option1Value))
        .filter((s, index, self) => self.indexOf(s) === index) // Remove duplicates
        .sort((a, b) => {
          const sizeOrder: Record<string, number> = {
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

  return {
    id,
    name: backendProduct.title,
    category,
    price,
    specialPrice,
    image: backendProduct.images[0] || "",
    description: backendProduct.description.substring(0, 150),
    inStock: baseVariant.inStock,
    stockQuantity: baseVariant.inventoryQty,
    badge,
    brand: extractBrand(backendProduct.title),
    hasSizes,
    sizes,
    variants,
    weight: baseVariant.weightGrams,
    sku: baseVariant.sku,
  };
}

/**
 * Transform array of backend products to frontend products
 */
export function mapBackendProducts(backendProducts: BackendProduct[]): Product[] {
  const mapped = backendProducts
    .map((bp, index) => {
      try {
        return mapBackendProduct(bp, index + 1);
      } catch (error) {
        console.error(`Failed to map product ${bp.handle}:`, error);
        return null;
      }
    })
    .filter((p): p is Product => p !== null);

  // Log category counts
  const categoryCounts: Record<string, number> = {};
  mapped.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  console.log('[Product Mapper] Category counts:', categoryCounts);

  return mapped;
}
