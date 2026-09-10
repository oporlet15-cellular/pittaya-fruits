'use client';

import React from 'react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { LINE_OA_CONFIG } from '@/lib/productsData';
import { MessageSquare, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();

  const handleLineClick = () => {
    setActiveLineMessage(
      `สวัสดีครับ ${LINE_OA_CONFIG.storeName}! ได้อ่านเรื่องราวของร้านแล้ว สนใจสอบถามรอบจัดส่งและผลไม้ตามฤดูกาลครับ`
    );
    setIsLineModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Narrative */}
      <div className="space-y-4 text-center">
        <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
          {t('aboutPhilosophy')}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-primary font-semibold">
          {t('aboutTitle')}
        </h1>
        <p className="text-xs sm:text-base text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          {t('aboutSubtitle')}
        </p>
      </div>

      {/* Main Story Content Card */}
      <div className="bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-outline-variant/40 space-y-6 text-sm text-on-surface-variant leading-relaxed">
        <h2 className="font-serif text-2xl text-primary font-semibold">
          {t('aboutMizumonoTitle')}
        </h2>
        <p>
          {t('aboutMizumonoP1')}
        </p>

        <h2 className="font-serif text-2xl text-primary font-semibold pt-4 border-t border-outline-variant/30">
          {t('aboutBrixTitle')}
        </h2>
        <p>
          {t('aboutBrixP1')}
        </p>

        <h2 className="font-serif text-2xl text-primary font-semibold pt-4 border-t border-outline-variant/30">
          {t('aboutCourierTitle')}
        </h2>
        <p>
          {t('aboutCourierP1')}
        </p>

        {/* Store info & map preview */}
        <div className="pt-4 border-t border-outline-variant/30 bg-surface-container-lowest p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-primary font-serif text-lg font-semibold">
            <MapPin className="w-5 h-5 text-secondary" />
            <span>{LINE_OA_CONFIG.storeName}</span>
          </div>
          <p className="text-xs text-on-surface-variant">
            {LINE_OA_CONFIG.address} • {t('storeHoursLabel')} {LINE_OA_CONFIG.storeHours} • {t('phoneLabel')} {LINE_OA_CONFIG.phone}
          </p>
          <a
            href={LINE_OA_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
          >
            <span>{t('openGoogleMapsPin')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base text-primary font-semibold">{t('aboutQuestions')}</h4>
            <p className="text-xs">{t('aboutQuestionsSub')}</p>
          </div>
          <button
            onClick={handleLineClick}
            className="bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{t('chatLine')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
