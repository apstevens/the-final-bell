/**
 * Product Data
 *
 * This file imports products from the auto-generated Playwell CSV data.
 * To update products, run: node scripts/importProducts.mjs
 *
 * See PLAYWELL-INTEGRATION.md for full documentation.
 */

// Import generated products from Playwell CSV
export { products } from "./products-generated";

// Use generated categories with improved descriptions
export const categories = [
  {
    id: "Boxing Gloves",
    name: "Boxing Gloves",
    description: "Professional boxing gloves from top brands like Twins, Rival, Venum, and Ringside",
    image: "https://www.playwell.co.uk/images/TWINSPINKGLOVES1.jpg",
  },
  {
    id: "MMA Gloves",
    name: "MMA Gloves",
    description: "Mixed martial arts gloves for training and competition from Venum, Fairtex, and Sandee",
    image: "https://www.playwell.co.uk/images/Venum-Impact-Evo-Sparring-MMA-Gloves-Black.jpg",
  },
  {
    id: "shorts",
    name: "Shorts",
    description: "Muay Thai and boxing shorts in various styles and colors",
    image: "https://www.playwell.co.uk/images/picblackshorts.jpg",
  },
  {
    id: "shinguards",
    name: "Shin Guards",
    description: "Shin guards and shin protection for Muay Thai, MMA, and kickboxing",
    image: "https://www.playwell.co.uk/images/PROMMASHINBLACK1.jpg",
  },
  {
    id: "protection",
    name: "Protection",
    description: "Head guards, body shields, groin guards, and protective gear for safe training",
    image: "/headguard.webp",
  },
  {
    id: "pads",
    name: "Training Pads",
    description: "Focus mitts, Thai pads, and striking pads for training",
    image: "https://www.playwell.co.uk/images/Rival-Boxing-RPM7-Fitness-Punch-Mitts-Blue.jpg",
  },
  {
    id: "bags",
    name: "Punch Bags",
    description: "Heavy bags, speed bags, and training bags",
    image: "https://www.playwell.co.uk/images/xxlnumbers1NEW.jpg",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Hand wraps, glove liners, and training accessories",
    image: "/handwraps.webp",
  },
];
