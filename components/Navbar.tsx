'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { ShoppingBag, MessageSquare, Menu, X, Sparkles, Clock, Globe } from 'lucide-react';
import { LINE_OA_CONFIG } from '@/lib/productsData';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, setIsLineModalOpen, setActiveLineMessage } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('2 ชม. 14 นาที 38 วินาที');

  // Dynamic countdown timer for same-day dispatch window
  useEffect(() => {
    let seconds = 2 * 3600 + 14 * 60 + 38;
    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (language === 'th') {
          setTimeLeft(`${h} ชม. ${m < 10 ? '0' : ''}${m} นาที ${s < 10 ? '0' : ''}${s} วิ`);
        } else {
          setTimeLeft(`${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/products', label: t('navCollections') },
    { href: '/corporate', label: t('navEvents') },
    { href: '/#how-to-order', label: t('navHowToOrder') },
    { href: '/about', label: t('navAbout') },
  ];

  const handleQuickLineChat = () => {
    const msg = language === 'th'
      ? `สวัสดีครับ/ค่ะ สนใจสั่งซื้อผลไม้จาก ${LINE_OA_CONFIG.storeName} วันนี้ครับ`
      : `Hello ${LINE_OA_CONFIG.storeName}! I would like to inquire about ordering fruit baskets/boxes today.`;
    setActiveLineMessage(msg);
    setIsLineModalOpen(true);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 transition-all">
      {/* Dispatch Window Urgency Announcement Bar */}
      <div className="bg-primary-container text-on-primary px-4 py-1.5 text-xs flex items-center justify-between shadow-inner">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-container"></span>
            </span>
            <span className="hidden sm:inline">{t('dispatchUrgency')}</span>
            <span>{t('dispatchWindow')} <strong className="text-secondary-fixed tracking-wider font-semibold">{timeLeft}</strong> {t('dispatchTarget')}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* TH / EN Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-white px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors border border-white/20"
              title="Change Language / เปลี่ยนภาษา"
            >
              <Globe className="w-3 h-3 text-secondary-fixed" />
              <span>{language === 'th' ? 'TH | ภาษาไทย' : 'EN | English'}</span>
            </button>

            <button
              onClick={handleQuickLineChat}
              className="flex items-center gap-1 bg-line-green hover:bg-line-dark text-white px-2.5 py-0.5 rounded-full font-semibold text-[11px] transition-colors shadow-sm shrink-0"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>{t('closeDealLine')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-primary uppercase group-hover:text-secondary transition-colors font-medium">
            BOTANICA
          </span>
          <span className="text-[10px] tracking-[0.2em] text-on-surface-variant font-medium">
            {LINE_OA_CONFIG.storeName}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors relative py-1 ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions: LINE Quick Chat & Cart Drawer */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleQuickLineChat}
            className="hidden sm:flex items-center gap-2 bg-surface-container-low border border-outline-variant hover:border-line-green hover:bg-line-green/5 text-primary text-xs font-semibold px-3.5 py-2 rounded-lg transition-all"
            title="แชทสั่งซื้อโดยตรงผ่าน LINE OA"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-line-green animate-pulse" />
            <span>{t('chatLine')}</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative p-2 text-primary hover:text-secondary transition-colors rounded-lg hover:bg-surface-container-low"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary font-semibold text-[10px] flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-secondary transition-colors rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/40 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-outline-variant/30 flex flex-col gap-2">
            <button
              onClick={toggleLanguage}
              className="w-full bg-surface-container-low border border-outline-variant text-primary text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-secondary" />
              <span>{language === 'th' ? 'เปลี่ยนเป็น English' : 'Switch to ภาษาไทย'}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleQuickLineChat();
              }}
              className="w-full bg-line-green text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('closeDealLine')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
