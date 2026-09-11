'use client';

import React, { useState } from 'react';
import { PRODUCTS, LINE_OA_CONFIG } from '@/lib/productsData';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Gift, MessageSquare, Heart, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';

export default function GiftingStudioPage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { language, t } = useLanguage();
  const giftableProducts = PRODUCTS.filter((p) => p.category === 'basket' || p.category === 'gift-box');

  const handleCustomGiftLineChat = () => {
    setActiveLineMessage(
      `สวัสดีครับ/ค่ะ สนใจปรึกษาจัดกระเช้าผลไม้ของขวัญ / กล่องของขวัญ กับทางร้านผลไม้เจ๊อึ่ง (Pittaya Fruits) 🎁`
    );
    setIsLineModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-outline-variant/40 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
        <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/40 px-3 py-1 rounded-full text-xs font-semibold text-secondary uppercase tracking-widest">
          <Gift className="w-3.5 h-3.5" />
          <span>{LINE_OA_CONFIG.storeName} Gifting Studio</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-primary font-semibold">
          {language === 'th' ? 'ศิลปะแห่งการมอบของขวัญล้ำค่า' : 'The Art of Thoughtful Gifting'}
        </h1>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto">
          {language === 'th'
            ? 'ด้วยประสบการณ์คัดสรรผลไม้กว่า 20 ปี และจัดกระเช้ามาแล้วกว่า 1,000+ กระเช้า ทุกกระเช้าและกล่องของขวัญมาพร้อมบริการผูกริบบิ้นฟรี สวยงามประณีต'
            : 'With over 20+ years of fruit selection expertise and 1,000+ gift baskets crafted, every gift basket and box includes complimentary tailored ribbon finishing.'}
        </p>

        <button
          onClick={handleCustomGiftLineChat}
          className="bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-md"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>{language === 'th' ? 'ปรึกษาจัดของขวัญทาง LINE OA' : 'Consult Gifting on LINE OA'}</span>
        </button>
      </div>

      {/* Recommended Gift Offerings */}
      <section className="space-y-6">
        <div className="border-b border-outline-variant/40 pb-4">
          <h2 className="font-serif text-2xl text-primary font-semibold">
            {language === 'th' ? 'เลือกกระเช้าหรือกล่องของขวัญ' : 'Choose Recommended Gift Basket or Box'}
          </h2>
          <p className="text-xs text-on-surface-variant">
            {language === 'th'
              ? 'เลือกขนาดกระเช้า (12", 14", 16") หรือเกรดผลไม้ (Standard / Premium) พร้อมส่งมอบความประทับใจ'
              : 'Select size (12", 14", 16") or fruit tier (Standard / Premium) with complimentary ribbon finishing.'}
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
