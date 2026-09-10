'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, BasketSize, BasketTier, RibbonColor } from './types';
import { LINE_OA_CONFIG } from './productsData';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLineModalOpen: boolean;
  setIsLineModalOpen: (open: boolean) => void;
  activeLineMessage: string;
  setActiveLineMessage: (msg: string) => void;
  addToCart: (
    product: Product,
    options?: {
      size?: BasketSize;
      tier?: BasketTier;
      ribbon?: RibbonColor;
      customNote?: string;
      quantity?: number;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  totalItems: number;
  openLineOrderForProduct: (
    product: Product,
    options?: {
      size?: BasketSize;
      tier?: BasketTier;
      ribbon?: RibbonColor;
      customNote?: string;
      quantity?: number;
    }
  ) => void;
  openLineOrderForCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [activeLineMessage, setActiveLineMessage] = useState('');

  // Calculate cart total
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const calculateUnitPrice = (
    product: Product,
    size?: BasketSize,
    tier?: BasketTier,
    quantity: number = 1
  ): number => {
    let price = product.basePrice;

    if (size && product.availableSizes) {
      const foundSize = product.availableSizes.find((s) => s.size === size);
      if (foundSize) price += foundSize.priceModifier;
    }

    if (tier && product.availableTiers) {
      const foundTier = product.availableTiers.find((t) => t.tier === tier);
      if (foundTier) price += foundTier.priceModifier;
    }

    // Apply bulk discount if available
    if (product.bulkDiscounts) {
      const applicableDiscount = [...product.bulkDiscounts]
        .sort((a, b) => b.minQuantity - a.minQuantity)
        .find((d) => quantity >= d.minQuantity);

      if (applicableDiscount) {
        price = applicableDiscount.pricePerUnit;
      }
    }

    return price;
  };

  const addToCart = (
    product: Product,
    options?: {
      size?: BasketSize;
      tier?: BasketTier;
      ribbon?: RibbonColor;
      customNote?: string;
      quantity?: number;
    }
  ) => {
    const size = options?.size || (product.availableSizes ? product.availableSizes[0].size : undefined);
    const tier = options?.tier || (product.availableTiers ? product.availableTiers[0].tier : undefined);
    const ribbon: RibbonColor = 'Signature Atelier Silk Ribbon';
    const customNote = options?.customNote || '';
    const quantity = options?.quantity || 1;

    const unitPrice = calculateUnitPrice(product, size, tier, quantity);
    const itemId = `${product.id}-${size || 'default'}-${tier || 'default'}-${customNote}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        const newUnitPrice = calculateUnitPrice(product, size, tier, newQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          unitPrice: newUnitPrice,
          totalPrice: newUnitPrice * newQty,
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          id: itemId,
          product,
          selectedSize: size,
          selectedTier: tier,
          selectedRibbon: ribbon,
          customCardNote: customNote,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const unitPrice = calculateUnitPrice(
            item.product,
            item.selectedSize,
            item.selectedTier,
            newQty
          );
          return {
            ...item,
            quantity: newQty,
            unitPrice,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Helper to format LINE text message
  const openLineOrderForProduct = (
    product: Product,
    options?: {
      size?: BasketSize;
      tier?: BasketTier;
      ribbon?: RibbonColor;
      customNote?: string;
      quantity?: number;
    }
  ) => {
    const size = options?.size || (product.availableSizes ? product.availableSizes[0].size : undefined);
    const tier = options?.tier || (product.availableTiers ? product.availableTiers[0].tier : undefined);
    const customNote = options?.customNote || '';
    const quantity = options?.quantity || 1;
    const unitPrice = calculateUnitPrice(product, size, tier, quantity);
    const totalPrice = unitPrice * quantity;

    let message = `🌿 *BOTANICA Mizumono Atelier Order Inquiry*\n`;
    message += `--------------------------------------\n`;
    message += `📦 *Product:* ${product.name}\n`;
    if (size) message += `📐 *Size:* ${size}\n`;
    if (tier) message += `⭐ *Tier:* ${tier}\n`;
    message += `🎀 *Presentation:* Signature Atelier Silk Ribbon (Included)\n`;
    message += `🔢 *Quantity:* ${quantity}\n`;
    message += `💰 *Est. Total:* $${totalPrice} USD\n`;

    if (customNote.trim()) {
      message += `✍️ *Calligraphy Card Note:* "${customNote.trim()}"\n`;
    }

    message += `--------------------------------------\n`;
    message += `I would like to confirm availability and schedule courier delivery.`;

    setActiveLineMessage(message);
    setIsLineModalOpen(true);
  };

  const openLineOrderForCart = () => {
    if (cart.length === 0) return;

    let message = `🌿 *BOTANICA Mizumono Atelier — Combined Order*\n`;
    message += `--------------------------------------\n`;

    cart.forEach((item, index) => {
      message += `[${index + 1}] *${item.product.name}*\n`;
      if (item.selectedSize) message += `   • Size: ${item.selectedSize}\n`;
      if (item.selectedTier) message += `   • Tier: ${item.selectedTier}\n`;
      message += `   • Presentation: Signature Silk Ribbon (Included)\n`;
      if (item.customCardNote) message += `   • Card Note: "${item.customCardNote}"\n`;
      message += `   • Qty: ${item.quantity} × $${item.unitPrice} = $${item.totalPrice}\n\n`;
    });

    message += `--------------------------------------\n`;
    message += `💰 *Total Estimated Price:* $${cartTotal} USD\n`;
    message += `I would like to finalize payment and delivery time on LINE OA.`;

    setActiveLineMessage(message);
    setIsLineModalOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isLineModalOpen,
        setIsLineModalOpen,
        activeLineMessage,
        setActiveLineMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems,
        openLineOrderForProduct,
        openLineOrderForCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
