'use client';

import React, { useState } from 'react';
import { PRODUCTS, LINE_OA_CONFIG } from '@/lib/productsData';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, MessageSquare } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';

export default function ProductsPage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  }

  const handleCustomLineInquiry = () => {
    setActiveLineMessage(
      `สวัสดีครับ ${LINE_OA_CONFIG.storeName}! สนใจสอบถามสั่งจัดกระเช้าผลไม้ตามงบประมาณพิเศษครับ`
    );
    setIsLineModalOpen(true);
  };

  const categories = [
    { id: 'all', label: t('tabAll') },
    { id: 'basket', label: t('tabBaskets') },
    { id: 'gift-box', label: t('tabGiftBoxes') },
    { id: 'mini-box', label: t('tabEventBoxes') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-surface-container-low rounded-2xl p-6 sm:p-10 border border-outline-variant/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              {t('catalogCategoryBadge')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-primary font-semibold mt-1">
              {t('catalogTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mt-1">
              {t('catalogDesc')}
            </p>
          </div>

          <button
            onClick={handleCustomLineInquiry}
            className="bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm self-start md:self-auto shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{t('catalogCustomInquiry')}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-primary focus:outline-none focus:border-primary transition-all"
            />
            <Search className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs">
            <SlidersHorizontal className="w-4 h-4 text-outline shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:border-primary transition-all"
            >
              <option value="default">{t('sortByDefault')}</option>
              <option value="price-low">{t('sortByPriceLow')}</option>
              <option value="price-high">{t('sortByPriceHigh')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-on-surface-variant space-y-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <p className="font-serif text-lg text-primary">{t('noProductsFound')}</p>
          <p className="text-xs">{t('noProductsSub')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
