'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, BasketSize, BasketTier } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { MessageSquare, Sparkles, Check, ArrowRight, Shield, Gift } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openLineOrderForProduct } = useCart();
  const { t, language } = useLanguage();

  // Selected state for Baskets
  const [selectedSize, setSelectedSize] = useState<BasketSize>(
    product.availableSizes ? product.availableSizes[0].size : '12"'
  );
  const [selectedTier, setSelectedTier] = useState<BasketTier>(
    product.availableTiers ? product.availableTiers[0].tier : 'Standard'
  );

  // Compute calculated price
  let currentPrice = product.basePrice;
  if (product.category === 'basket' && product.availableSizes) {
    const sizeObj = product.availableSizes.find((s) => s.size === selectedSize);
    if (sizeObj) currentPrice += sizeObj.priceModifier;

    if (selectedTier === 'Premium' && product.availableTiers) {
      const tierObj = product.availableTiers.find((t) => t.tier === 'Premium');
      if (tierObj) currentPrice += tierObj.priceModifier;
    }
  }

  const handleOrderOnLine = () => {
    openLineOrderForProduct(product, {
      size: product.category === 'basket' ? selectedSize : undefined,
      tier: product.category === 'basket' ? selectedTier : undefined,
      ribbon: 'ผูกริบบิ้นฟรี',
    });
  };

  const handleAddToCart = () => {
    addToCart(product, {
      size: product.category === 'basket' ? selectedSize : undefined,
      tier: product.category === 'basket' ? selectedTier : undefined,
      ribbon: 'ผูกริบบิ้นฟรี',
    });
  };

  const formattedPrice = currentPrice.toLocaleString('th-TH');

  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
      <div className="space-y-4">
        {/* Product Image Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg bg-surface-container border border-outline-variant/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-primary shadow-sm">
              {language === 'th' ? 'คัดสดใหม่ทุกวัน' : 'Fresh Daily'}
            </span>
            {product.isLimitedRelease && (
              <span className="bg-secondary text-on-secondary px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider">
                {language === 'th' ? 'จำนวนจำกัดต่อวัน' : 'Limited Release'}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1 rounded-lg shadow-md flex items-baseline gap-1">
            <span className="text-[10px] text-on-surface-variant font-medium">THB</span>
            <span className="font-serif text-lg text-primary font-bold">฿{formattedPrice}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span className="text-secondary font-semibold uppercase tracking-widest text-[11px]">
              {product.category === 'basket'
                ? (language === 'th' ? 'กระเช้าผลไม้พรีเมียม' : 'Artisanal Grand Reserve')
                : product.category === 'gift-box'
                ? (language === 'th' ? 'กล่องของขวัญผลไม้' : 'Signature Gift Box')
                : (language === 'th' ? 'ผลไม้จัดเบรค & สัมมนา' : 'Event & Activity Pack')}
            </span>
            <span className="text-outline font-mono text-[10px]">{product.lotNumber}</span>
          </div>
          <h3 className="font-serif text-base sm:text-lg text-primary font-semibold group-hover:text-secondary transition-colors leading-snug">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Dynamic Selectors for Baskets (Sizes 12", 14", 16" & Tiers) */}
        {product.category === 'basket' && product.availableSizes && (
          <div className="bg-surface-container-low p-3 rounded-lg space-y-2.5 border border-outline-variant/30">
            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-[11px] text-on-surface-variant mb-1 font-medium">
                <span>{t('selectBasketSize')}</span>
                <span className="text-primary font-bold">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {product.availableSizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-1.5 px-2 rounded text-xs font-semibold transition-all ${
                      selectedSize === s.size
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Selector */}
            {product.availableTiers && (
              <div>
                <div className="flex justify-between items-center text-[11px] text-on-surface-variant mb-1 font-medium">
                  <span>{t('selectTier')}</span>
                  <span className="text-secondary font-bold">{selectedTier}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {product.availableTiers.map((t) => (
                    <button
                      key={t.tier}
                      type="button"
                      onClick={() => setSelectedTier(t.tier)}
                      className={`py-1.5 px-2 rounded text-[11px] font-semibold transition-all ${
                        selectedTier === t.tier
                          ? 'bg-secondary text-on-secondary shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Complimentary Silk Ribbon & Calligraphy Card Inclusion Badge */}
        <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-[11px] text-primary flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-secondary shrink-0" />
          <span className="font-medium">{t('freeGiftWrapBadge')}</span>
        </div>

        {/* Highlights Tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {product.highlights.map((h, i) => (
            <span
              key={i}
              className="bg-surface-container-low text-on-surface-variant text-[10px] px-2 py-0.5 rounded border border-outline-variant/30 flex items-center gap-1"
            >
              <Check className="w-2.5 h-2.5 text-primary" />
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2">
        <button
          onClick={handleOrderOnLine}
          className="w-full bg-line-green hover:bg-line-dark text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>{t('btnPreOrderLine')} — ฿{formattedPrice}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.id}`}
            className="w-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 text-primary text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-center"
          >
            <span>{t('btnCustomizeNote')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-medium py-2 px-3 rounded-lg transition-colors"
          >
            {t('btnAddToBag')}
          </button>
        </div>
      </div>
    </article>
  );
}
