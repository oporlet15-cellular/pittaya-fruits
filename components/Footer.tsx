'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { LINE_OA_CONFIG } from '@/lib/productsData';
import { MessageSquare, ShieldCheck, Truck, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { setIsLineModalOpen, setActiveLineMessage } = useCart();
  const { t, language } = useLanguage();

  const handleLineClick = () => {
    setActiveLineMessage(
      `สวัสดีครับ ${LINE_OA_CONFIG.storeName}! สนใจสอบถามปรึกษาสั่งกระเช้าผลไม้ครับ`
    );
    setIsLineModalOpen(true);
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/40 pt-16 pb-12 text-on-surface-variant text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Assurance Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-sm uppercase tracking-wide">
                {t('warrantyTitle')}
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {t('warrantyDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-sm uppercase tracking-wide">
                {t('courierTitle')}
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {t('courierDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-line-green/10 text-line-dark flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-sm uppercase tracking-wide">
                {t('instantLineTitle')}
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {t('instantLineDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.16em] text-primary uppercase font-semibold">
                BOTANICA
              </span>
              <span className="text-xs tracking-[0.2em] text-secondary font-medium">
                {LINE_OA_CONFIG.storeName}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              {t('aboutBrandDesc')}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleLineClick}
                className="inline-flex items-center gap-2 bg-line-green hover:bg-line-dark text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t('chatLine')}</span>
              </button>
              <img
                src={LINE_OA_CONFIG.qrCodeImage}
                alt="LINE QR Code"
                className="w-10 h-10 object-contain rounded border border-outline-variant/40 bg-white p-0.5 cursor-pointer hover:scale-105 transition-transform"
                onClick={handleLineClick}
                title="Scan LINE QR"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif text-sm text-primary uppercase tracking-wider font-semibold mb-3">
              {t('navCollections')}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=basket" className="hover:text-primary transition-colors">
                  {t('tabBaskets')}
                </Link>
              </li>
              <li>
                <Link href="/products?category=gift-box" className="hover:text-primary transition-colors">
                  {t('tabGiftBoxes')}
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-primary transition-colors">
                  {t('navEvents')} ({t('minOrder10Badge')})
                </Link>
              </li>
              <li>
                <Link href="/#how-to-order" className="hover:text-primary transition-colors">
                  {t('navHowToOrder')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {t('navAbout')} & Google Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Google Maps Info */}
          <div>
            <h5 className="font-serif text-sm text-primary uppercase tracking-wider font-semibold mb-3">
              {t('storeInfoTitle')}
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{t('storeHoursLabel')} {LINE_OA_CONFIG.storeHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{t('phoneLabel')} {LINE_OA_CONFIG.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <span>{LINE_OA_CONFIG.address}</span>
              </li>
            </ul>

            <div className="mt-3">
              <a
                href={LINE_OA_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t('openGoogleMapsPin')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Google Maps Location Preview Card */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold block">
              Google Maps Location
            </span>
            <h6 className="font-serif text-sm text-primary font-medium">{LINE_OA_CONFIG.storeName}</h6>
            <p className="text-xs text-on-surface-variant">
              {language === 'th'
                ? 'ตั้งอยู่ที่คลองจั่น บางกะปิ กรุงเทพฯ พร้อมบริการจัดส่งรถควบคุมความเย็นทั่วกรุงเทพฯ'
                : 'Located in Klong Chan, Bang Kapi, Bangkok. Serving same-day refrigerated courier delivery across Bangkok.'}
            </p>
            <a
              href={LINE_OA_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-center block"
            >
              <MapPin className="w-3.5 h-3.5 text-line-green" />
              <span>{t('viewGoogleMaps')}</span>
            </a>
          </div>
        </div>

        {/* Copyright & Fine Print */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between text-xs text-outline space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} {LINE_OA_CONFIG.storeName}. {t('allRightsReserved')}</p>
          <div className="flex space-x-4">
            <a href={LINE_OA_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Google Maps Pin
            </a>
            <span>•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Brix Quality Policy</span>
            <span>•</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Courier Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
