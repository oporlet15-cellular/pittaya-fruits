'use client';

import React, { useState } from 'react';
import CalligraphyCardBuilder from '@/components/CalligraphyCardBuilder';
import { PRODUCTS } from '@/lib/productsData';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Gift, MessageSquare, Heart, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function GiftingStudioPage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const giftableProducts = PRODUCTS.filter((p) => p.category === 'basket' || p.category === 'gift-box');

  const handleCustomGiftLineChat = () => {
    setActiveLineMessage(
      `Hello BOTANICA Atelier! 🎁 I am in your Gifting Studio and would like to build a custom fruit basket presentation.`
    );
    setIsLineModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-outline-variant/40 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
        <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/40 px-3 py-1 rounded-full text-xs font-semibold text-secondary uppercase tracking-widest">
          <Gift className="w-3.5 h-3.5" />
          <span>Botanica Mizumono Atelier Gifting</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-primary font-semibold">
          The Art of Gifting
        </h1>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto">
          In Japanese culture, *mizumono* (water fruits) are presented with reverent care. Every basket is paired with hand-woven bamboo, tailored silk ribbons, and archival calligraphy notes.
        </p>

        <button
          onClick={handleCustomGiftLineChat}
          className="bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-md"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Consult Gifting Sommelier on LINE OA</span>
        </button>
      </div>

      {/* Calligraphy Card Builder */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-primary font-semibold">
          1. Create Your Handwritten Gift Parchment
        </h2>
        <CalligraphyCardBuilder />
      </section>

      {/* Recommended Gift Offerings */}
      <section className="space-y-6">
        <div className="border-b border-outline-variant/40 pb-4">
          <h2 className="font-serif text-2xl text-primary font-semibold">
            2. Choose Recommended Gift Basket or Box
          </h2>
          <p className="text-xs text-on-surface-variant">
            Select size (12", 14", 16") or tier to pair with your custom ribbon & calligraphy card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {giftableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
