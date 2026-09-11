'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/productsData';
import ProductCard from '@/components/ProductCard';
import HowToOrderBar from '@/components/HowToOrderBar';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { MessageSquare, ArrowRight, Sparkles, ShieldCheck, Award, Star, Truck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { LINE_OA_CONFIG } from '@/lib/productsData';

export default function HomePage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'basket' | 'gift-box' | 'mini-box'>('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleHeroLineChat = () => {
    const msg = language === 'th'
      ? `สวัสดีครับ/ค่ะ สนใจสอบถามและสั่งซื้อกระเช้าผลไม้พรีเมียมจาก ${LINE_OA_CONFIG.storeName}`
      : `Hello ${LINE_OA_CONFIG.storeName}! I'd like to inquire about ordering artisanal fruit baskets today.`;
    setActiveLineMessage(msg);
    setIsLineModalOpen(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Hero Section */}
      <section className="relative rounded-3xl bg-surface-container-low p-6 sm:p-12 border border-outline-variant/40 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-primary font-normal tracking-tight">
              <span className="block text-2xl sm:text-4xl lg:text-[46px] leading-[1.3] font-medium">
                {t('heroTitle1')}
              </span>
              <span className="block mt-2.5 sm:mt-3.5 text-xl sm:text-3xl lg:text-[36px] italic text-secondary font-light leading-[1.4]">
                {t('heroTitle2')}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
              {t('heroDesc')}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleHeroLineChat}
                className="bg-line-green hover:bg-line-dark text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t('addLineBtn')}</span>
              </button>

              <Link
                href="/products"
                className="bg-primary hover:bg-primary-container text-on-primary font-semibold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <span>{t('heroCtaExplore')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/30 text-xs">
              <div>
                <span className="text-secondary font-serif text-base font-bold block">{t('heroSpec1Title')}</span>
                <span className="text-on-surface-variant text-[11px]">{t('heroSpec1Sub')}</span>
              </div>
              <div>
                <span className="text-primary font-serif text-base font-bold block">{t('heroSpec2Title')}</span>
                <span className="text-on-surface-variant text-[11px]">{t('heroSpec2Sub')}</span>
              </div>
              <div>
                <span className="text-primary font-serif text-base font-bold block">{t('heroSpec3Title')}</span>
                <span className="text-on-surface-variant text-[11px]">{t('heroSpec3Sub')}</span>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40 bg-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSUb-V5i1CsXqJmKvCQdb0A0t3PqruJP0c9X5Rxko74-_HuQ9tQMuSEi80vRisGCAdVCcXqxLkhT6JejveuLUTBZt-iUsV0bxfT8iH16C5Nq0ZY_TaHRTe9x1TnXP_Ygq5d4pPvEJbzOVoJigEt0BeO0epoWTuswVt6-FPACP_7OfrMLnHt-0HcNFS0RLnnVRQE2JUuHACNFd0-oqSSzrEqoksCNiY55woviBG6GBfLoCXjvxNDYOo"
                alt="กระเช้าผลไม้พรีเมียม Pittaya Fruits (ร้านผลไม้เจ๊อึ่ง)"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 rounded-xl bg-primary/50 backdrop-blur-md border border-white/20">
                <span className="text-[10px] uppercase tracking-widest text-secondary-fixed font-semibold block">
                  Lot #042 Grand Reserve
                </span>
                <p className="font-serif text-sm font-semibold">กระเช้าผลไม้สด Pittaya Grand Basket</p>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span>ขนาด 12", 14", 16"</span>
                  <span className="font-bold text-secondary-fixed">฿1,000 – ฿3,500 THB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order Bar */}
      <HowToOrderBar />

      {/* Product Categories Sales Funnel Rail */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
          <div>
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              {t('collectionsBadge')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-semibold mt-1">
              {t('collectionsTitle')}
            </h2>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: t('tabAll') },
              { id: 'basket', label: t('tabBaskets') },
              { id: 'gift-box', label: t('tabGiftBoxes') },
              { id: 'mini-box', label: t('tabEventBoxes') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Verified Patron Reviews Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-10 border border-outline-variant/40 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <div>
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              {t('patronBadge')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-primary font-semibold">
              {t('patronTitle')}
            </h2>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 space-y-4">
            <div className="flex text-secondary gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif text-sm text-primary italic leading-relaxed">
              {t('review1Text')}
            </p>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
              <span className="font-semibold text-primary">{t('review1Author')}</span>
              <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded font-medium">
                {language === 'th' ? 'กระเช้าของขวัญ' : 'Gift Basket'}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 space-y-4">
            <div className="flex text-secondary gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-serif text-sm text-primary italic leading-relaxed">
              {t('review2Text')}
            </p>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
              <span className="font-semibold text-primary">{t('review2Author')}</span>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                {language === 'th' ? 'งานสัมมนาองค์กร' : 'Corporate Event'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final LINE OA Sales Funnel Call to Action Banner */}
      <section className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="inline-block bg-line-green text-white text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {language === 'th' ? 'ปรึกษาและสั่งซื้อโดยตรงกับแอดมิน' : 'Instant Sommelier Consultation'}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
            {language === 'th' ? 'พร้อมมอบกระเช้าผลไม้สุดพิเศษแล้วหรือยัง?' : 'Ready to Order Your Artisanal Harvest?'}
          </h2>

          <p className="text-xs sm:text-sm text-on-primary-container leading-relaxed">
            {language === 'th'
              ? 'ทักแชทสั่งซื้อผ่าน LINE OA ได้ทันที เราพร้อมจัดเตรียมผลไม้สดใหม่ ผูกริบบิ้นสวยงาม และจัดส่งด่วนถึงมือผู้รับอย่างประณีต'
              : 'Chat directly with our team on LINE OA. We will confirm your preferred fruit varieties, basket sizes, ribbons, and dispatch time.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleHeroLineChat}
              className="w-full sm:w-auto bg-line-green hover:bg-line-dark text-white font-semibold py-3.5 px-8 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('heroCtaOrder')}</span>
            </button>
            <Link
              href="/corporate"
              className="w-full sm:w-auto bg-surface-container-lowest/10 hover:bg-white/20 text-on-primary font-medium py-3.5 px-6 rounded-xl text-sm transition-colors"
            >
              {language === 'th' ? 'สอบถามเซ็ตผลไม้จัดเบรค' : 'Inquire Event Catering'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
