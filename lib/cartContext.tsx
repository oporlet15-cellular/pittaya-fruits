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
    const isMiniBox = product.category === 'mini-box';
    const ribbon: RibbonColor | undefined = isMiniBox ? undefined : 'ผูกริบบิ้นฟรี';
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === cartItemId) {
          const minAllowed = item.product.category === 'mini-box' ? 10 : 1;
          const actualQty = Math.max(minAllowed, newQty);
          const newUnitPrice = calculateUnitPrice(item.product, item.selectedSize, item.selectedTier, actualQty);
          return {
            ...item,
            quantity: actualQty,
            unitPrice: newUnitPrice,
            totalPrice: newUnitPrice * actualQty,
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
    const isMiniBox = product.category === 'mini-box';
    const size = options?.size || (product.availableSizes ? product.availableSizes[0].size : undefined);
    const tier = options?.tier || (product.availableTiers ? product.availableTiers[0].tier : undefined);
    const customNote = options?.customNote || '';
    const quantity = options?.quantity || 1;
    const unitPrice = calculateUnitPrice(product, size, tier, quantity);
    const totalPrice = unitPrice * quantity;

    let message = `🌿 *ร้านผลไม้เจ๊อึ่ง (Pittaya Fruits) — สนใจสั่งซื้อ*\n`;
    message += `--------------------------------------\n`;
    message += `📦 *สินค้า:* ${product.name} (รหัส: ${product.lotNumber})\n`;
    if (size) message += `📐 *ขนาด:* ${size}\n`;
    if (tier) message += `⭐ *เกรด:* ${tier}\n`;
    if (!isMiniBox) {
      message += `🎀 *บริการ:* ผูกริบบิ้นฟรี\n`;
    } else {
      message += `🍱 *รูปแบบ:* เซ็ตผลไม้จัดเบรค (พร้อมส้อมไม้)\n`;
    }
    message += `🔢 *จำนวน:* ${quantity} ${isMiniBox ? 'กล่อง' : 'ชิ้น'}\n`;
    message += `💰 *ยอดรวมโดยประมาณ:* ฿${totalPrice.toLocaleString()} บาท\n`;
    message += `🚗 *การจัดส่ง:* จัดส่งรถยนต์ผ่านแพลตฟอร์ม (คิดค่าส่งตามระยะทางจริง)\n`;
    message += `--------------------------------------\n`;
    message += `ต้องการสอบถามคิวจัดส่งและสรุปยอดกับทางร้านครับ/ค่ะ`;

    setActiveLineMessage(message);
    setIsLineModalOpen(true);
  };

  const openLineOrderForCart = () => {
    if (cart.length === 0) return;

    let message = `🌿 *ร้านผลไม้เจ๊อึ่ง (Pittaya Fruits) — รายการสั่งซื้อ*\n`;
    message += `--------------------------------------\n`;

    cart.forEach((item, index) => {
      const isItemMiniBox = item.product.category === 'mini-box';
      message += `[${index + 1}] *${item.product.name}* (รหัส: ${item.product.lotNumber})\n`;
      if (item.selectedSize) message += `   • ขนาด: ${item.selectedSize}\n`;
      if (item.selectedTier) message += `   • เกรด: ${item.selectedTier}\n`;
      if (!isItemMiniBox) {
        message += `   • บริการ: ผูกริบบิ้นฟรี\n`;
      } else {
        message += `   • รูปแบบ: เซ็ตจัดเบรค (พร้อมส้อมไม้)\n`;
      }
      message += `   • จำนวน: ${item.quantity} ${isItemMiniBox ? 'กล่อง' : 'ชิ้น'} × ฿${item.unitPrice.toLocaleString()} = ฿${item.totalPrice.toLocaleString()} บาท\n\n`;
    });

    message += `--------------------------------------\n`;
    message += `💰 *ยอดรวมสินค้าโดยประมาณ:* ฿${cartTotal.toLocaleString()} บาท\n`;
    message += `🚗 *การจัดส่ง:* จัดส่งรถยนต์ผ่านแพลตฟอร์ม (คิดค่าส่งตามระยะทางจริง)\n`;
    message += `ต้องการยืนยันรายการ ชำระเงิน และนัดหมายเวลาจัดส่งครับ/ค่ะ`;

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
