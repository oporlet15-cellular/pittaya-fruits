'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, BasketSize, BasketTier } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { MessageSquare, Sparkles, Check, ArrowRight, Shield, Gift, Utensils } from 'lucide-react';

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
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  const handleSizeChange = (size: BasketSize) => {
    if (size !== selectedSize) {
      setSelectedSize(size);
      setIsPriceAnimating(true);
      setTimeout(() => setIsPriceAnimating(false), 350);
    }
  };

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
      tier: (product.category === 'basket' && product.availableTiers) ? selectedTier : undefined,
      ribbon: product.category === 'mini-box' ? undefined : 'ผูกริบบิ้นฟรี',
    });
  };

  const handleAddToCart = () => {
    addToCart(product, {
      size: product.category === 'basket' ? selectedSize : undefined,
      tier: (product.category === 'basket' && product.availableTiers) ? selectedTier : undefined,
      ribbon: product.category === 'mini-box' ? undefined : 'ผูกริบบิ้นฟรี',
    });
  };

  const formattedPrice = currentPrice.toLocaleString('th-TH');

  return (
    <article className="bg-surface-container-lowest rounded-2xl border border-outline-variant/50 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:shadow-xl hover:-translate-y-1.5 hover:border-secondary/30 transition-all duration-300 ease-out group">
      <div className="space-y-4">
        {/* Product Image Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-white border border-outline-variant/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 bg-white group-hover:scale-105 transition-transform duration-500 ease-out"
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

          <div
            className={`absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md flex items-baseline gap-1 transition-all duration-300 ${
              isPriceAnimating
                ? 'animate-price-pop ring-2 ring-secondary shadow-secondary/25 bg-surface-container-low scale-105'
                : 'border border-outline-variant/30'
            }`}
          >
            <span className="text-[10px] text-on-surface-variant font-medium">THB</span>
            <span
              className={`font-serif text-lg font-bold transition-colors duration-200 ${
                isPriceAnimating ? 'text-secondary font-extrabold' : 'text-primary'
              }`}
            >
              ฿{formattedPrice}
            </span>
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
            <span className="text-on-surface-variant font-mono text-[10px] font-medium bg-surface-container-low px-1.5 py-0.5 rounded border border-outline-variant/40">
              {language === 'th' ? `รหัส: ${product.lotNumber}` : `SKU: ${product.lotNumber}`}
            </span>
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
                    onClick={() => handleSizeChange(s.size)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 ${
                      selectedSize === s.size
                        ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/20 scale-[1.02]'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/40 hover:border-outline'
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

        {/* Complimentary Ribbon Badge (Baskets/Gift Boxes) or Eco Fork Badge (Mini Boxes) */}
        {product.category !== 'mini-box' ? (
          <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-[11px] text-primary flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="font-medium">{t('freeGiftWrapBadge')}</span>
          </div>
        ) : (
          <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-[11px] text-on-surface-variant flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="font-medium">{t('eventNoRibbonBadge')}</span>
          </div>
        )}

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
          className={`w-full text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98] ${
            isPriceAnimating
              ? 'bg-line-dark ring-2 ring-line-green/50 shadow-md scale-[1.01]'
              : 'bg-line-green hover:bg-line-dark'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span className={`transition-transform duration-200 ${isPriceAnimating ? 'scale-105 font-bold' : ''}`}>
            {t('btnPreOrderLine')} — ฿{formattedPrice}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.id}`}
            className="w-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 text-primary text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 text-center"
          >
            <span>{t('btnCustomizeNote')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-medium py-2 px-3 rounded-lg transition-all active:scale-95"
          >
            {t('btnAddToBag')}
          </button>
        </div>
      </div>
    </article>
  );
}
