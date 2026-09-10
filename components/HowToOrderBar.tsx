'use client';

import React from 'react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { ShoppingBag, Edit3, MessageSquare, Truck, ArrowRight } from 'lucide-react';
import { LINE_OA_CONFIG } from '@/lib/productsData';

export default function HowToOrderBar() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();

  const steps = [
    {
      step: '01',
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: ShoppingBag,
    },
    {
      step: '02',
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: Edit3,
    },
    {
      step: '03',
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: MessageSquare,
    },
    {
      step: '04',
      title: t('step4Title'),
      desc: t('step4Desc'),
      icon: Truck,
    },
  ];

  const handleStartOrder = () => {
    const msg = language === 'th'
      ? `สวัสดีครับ/ค่ะ สนใจสอบถามและสั่งซื้อผลไม้จาก ${LINE_OA_CONFIG.storeName}`
      : `Hello ${LINE_OA_CONFIG.storeName}! I read the "How to Order" guide and would like to start a fruit basket order.`;
    setActiveLineMessage(msg);
    setIsLineModalOpen(true);
  };

  return (
    <section id="how-to-order" className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/40 space-y-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
            {t('howToOrderBadge')}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-semibold mt-1">
            {t('howToOrderTitle')}
          </h2>
        </div>

        <button
          onClick={handleStartOrder}
          className="bg-line-green hover:bg-line-dark text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>{t('closeDealLine')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 space-y-3 relative group hover:border-primary/40 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-bold text-secondary/30 group-hover:text-secondary transition-colors">
                  {s.step}
                </span>
              </div>
              <h3 className="font-serif text-base font-semibold text-primary">
                {s.title}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
