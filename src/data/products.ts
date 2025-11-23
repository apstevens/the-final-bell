/**
 * Product Data
 *
 * This file loads products from the Final Bell API (muaythai-boxing.com).
 * Products are fetched dynamically from the backend.
 *
 * The backend syncs products daily from muaythai-boxing.com.
 */

import type { Product } from "../contexts/CartContext";

// Export empty array as default - products will be loaded dynamically
export const products: Product[] = [];

// Hierarchical category structure with subcategories
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
}

// Product categories - images from actual products in catalog
export const categories: CategoryItem[] = [
  {
    id: "gloves",
    name: "Gloves",
    description: "Professional boxing, Muay Thai, and MMA gloves",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/bgl3-fairtex-lace-up-sparring-boxing-gloves-black-white.jpg?v=1739556857",
    subcategories: [
      { id: "boxing-muaythai-gloves", name: "Boxing & Muay Thai Gloves", parentId: "gloves" },
      { id: "mma-gloves", name: "MMA Gloves", parentId: "gloves" },
      { id: "lace-up-gloves", name: "Lace-up Gloves", parentId: "gloves" },
      { id: "printed-limited", name: "Printed Designs / Limited Editions", parentId: "gloves" },
    ],
  },
  {
    id: "shorts",
    name: "Shorts",
    description: "Muay Thai and MMA shorts from top brands",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/bs-fairtex-x-urface-limited-edition-muaythai-shorts.jpg?v=1739557190",
    subcategories: [
      { id: "fairtex-shorts", name: "Fairtex Muaythai & MMA Shorts", parentId: "shorts" },
      { id: "tuff-shorts", name: "TUFF Muaythai Shorts", parentId: "shorts" },
      { id: "twins-shorts", name: "Twins Special Shorts", parentId: "shorts" },
      { id: "venum-shorts", name: "Venum Shorts", parentId: "shorts" },
    ],
  },
  {
    id: "shinguards",
    name: "Shin Guards",
    description: "Shin guards and shin protection for Muay Thai, MMA, and kickboxing",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/sf2-mtg-pro-elastic-shin-pads-black.jpg?v=1739557038",
  },
  {
    id: "protection",
    name: "Protection",
    description: "Head guards, body shields, groin guards, and protective gear for safe training",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/bepl2-twins-leather-belly-pad-black.jpg?v=1739557211",
  },
  {
    id: "pads",
    name: "Pads",
    description: "Focus mitts, Thai pads, and striking pads for training",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/kpl10-twins-curved-leather-thai-kick-pads-black-2.jpg?v=1755012870",
  },
  {
    id: "bags",
    name: "Punch Bags",
    description: "Heavy bags, speed bags, and training bags",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/hb10-fairtex-bowling-bag-filled.jpg?v=1739480075",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Hand wraps, glove liners, and training accessories",
    image: "https://cdn.shopify.com/s/files/1/0779/9511/4763/files/bag4-fairtex-rucksack-gym-bag-black-camo.jpg?v=1739557216",
  },
];
