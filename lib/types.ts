export type BasketSize = '12"' | '14"' | '16"';
export type BasketTier = 'Standard' | 'Premium';
export type RibbonColor = 'Signature Atelier Silk Ribbon';

export interface Product {
  id: string;
  name: string;
  category: 'basket' | 'gift-box' | 'mini-box';
  subtitle: string;
  description: string;
  brixIndex: string; // e.g. "Peak 18° Brix"
  lotNumber: string;
  basePrice: number;
  image: string;
  highlights: string[];
  isLimitedRelease?: boolean;
  stockRemaining?: number;
  availableSizes?: {
    size: BasketSize;
    label: string;
    fruitCount: string;
    priceModifier: number;
  }[];
  availableTiers?: {
    tier: BasketTier;
    label: string;
    description: string;
    priceModifier: number;
  }[];
  bulkDiscounts?: {
    minQuantity: number;
    pricePerUnit: number;
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize?: BasketSize;
  selectedTier?: BasketTier;
  selectedRibbon: RibbonColor;
  customCardNote: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
