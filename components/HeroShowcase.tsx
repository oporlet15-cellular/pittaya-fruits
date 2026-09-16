'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSlide {
  id: string;
  badgeTh: string;
  badgeEn: string;
  code: string;
  image: string;
  altTh: string;
  altEn: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'pittaya-grand-premium-basket',
    badgeTh: 'ยอดนิยม · Best Seller',
    badgeEn: 'Best Seller',
    code: 'PT-020',
    image: '/placeholder-white.svg',
    altTh: 'กระเช้าผลไม้พรีเมียมนำเข้า Pittaya Grand Premium',
    altEn: 'Pittaya Grand Premium Fruit Basket',
  },
  {
    id: 'signature-gift-box',
    badgeTh: 'กล่องของขวัญ · Gift Box',
    badgeEn: 'Signature Gift Box',
    code: 'PT-030',
    image: '/placeholder-white.svg',
    altTh: 'กล่องของขวัญผลไม้สด Signature Gift Box',
    altEn: 'Artisanal Signature Fruit Gift Box',
  },
  {
    id: 'corporate-fresh-cup',
    badgeTh: 'จัดเบรค · Snack Box',
    badgeEn: 'Catering Snack Box',
    code: 'PT-050',
    image: '/placeholder-white.svg',
    altTh: 'เซ็ตผลไม้จัดเบรคพรีเมียม Fruit Break Box',
    altEn: 'Corporate Fresh Fruit Break Box',
  },
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds

export default function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();

  // Auto-advance slideshow, paused when mouse is hovering
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full max-w-lg mx-auto animate-fade-in-up [animation-delay:250ms]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero Product Visual"
    >
      {/* Visual Frame: Clean, Rounded, Exactly as Requested */}
      <div className="relative aspect-square w-full rounded-3xl bg-white border border-outline-variant/40 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex items-center justify-center">
        
        {/* Clickable Image linking to the product */}
        <Link
          href={`/products/${currentSlide.id}`}
          className="w-full h-full flex items-center justify-center p-8 cursor-pointer group/link"
        >
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={language === 'th' ? currentSlide.altTh : currentSlide.altEn}
            className="w-full h-full object-contain transition-all duration-500 ease-out group-hover/link:scale-105"
          />
        </Link>

        {/* Top Left Badge: Dark pill with Star icon */}
        <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 bg-primary/95 backdrop-blur-sm text-on-primary text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md flex items-center gap-1.5 pointer-events-none transition-all z-10 max-w-[65%] truncate">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-current shrink-0" />
          <span className="truncate">{language === 'th' ? currentSlide.badgeTh : currentSlide.badgeEn}</span>
        </div>

        {/* Top Right Badge: Light pill with Product Code */}
        <div className="absolute top-3.5 sm:top-5 right-3.5 sm:right-5 bg-white/95 backdrop-blur-sm text-primary font-mono text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg border border-outline-variant/40 shadow-sm pointer-events-none z-10">
          {language === 'th' ? `รหัส: ${currentSlide.code}` : `SKU: ${currentSlide.code}`}
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous image"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white text-primary border border-outline-variant/40 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          type="button"
          aria-label="Next image"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white text-primary border border-outline-variant/40 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-10"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Slide Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-outline-variant/30 shadow-sm">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-6 h-1.5 bg-primary'
                  : 'w-1.5 h-1.5 bg-outline-variant/60 hover:bg-outline'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
