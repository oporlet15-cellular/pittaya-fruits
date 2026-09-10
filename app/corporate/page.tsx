'use client';

import React, { useState } from 'react';
import { PRODUCTS, LINE_OA_CONFIG } from '@/lib/productsData';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { MessageSquare, PartyPopper, AlertCircle } from 'lucide-react';

export default function EventsAndActivitiesPage() {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();
  const miniBoxes = PRODUCTS.filter((p) => p.category === 'mini-box');

  const [boxQuantity, setBoxQuantity] = useState(10);
  const baseUnitPrice = 150; // THB

  let unitPrice = baseUnitPrice;
  if (boxQuantity >= 50) unitPrice = 120;
  else if (boxQuantity >= 20) unitPrice = 135;
  else if (boxQuantity >= 10) unitPrice = 150;

  const estimatedTotal = unitPrice * boxQuantity;

  const handleEventLineInquiry = () => {
    const msg = `🎉 *${language === 'th' ? 'สอบถามสั่งเซ็ตผลไม้จัดเบรค & อีเวนต์' : 'Event & Activity Catering Inquiry'} — ${LINE_OA_CONFIG.storeName}*\n` +
      `--------------------------------------\n` +
      `🔢 *${language === 'th' ? 'จำนวนที่ต้องการ:' : 'Requested Quantity:'}* ${boxQuantity} ${language === 'th' ? 'กล่อง (ขั้นต่ำ 10 กล่อง)' : 'Mini Fruit Boxes (Min. 10)'}\n` +
      `💰 *${language === 'th' ? 'ราคาต่อกล่อง:' : 'Estimated Tier Price:'}* ฿${unitPrice.toLocaleString('th-TH')} THB (${language === 'th' ? 'รวมยอดประมาณ' : 'Total'}: ฿${estimatedTotal.toLocaleString('th-TH')} THB)\n` +
      `🚗 *${language === 'th' ? 'การจัดส่ง:' : 'Delivery:'}* ${language === 'th' ? 'รถยนต์ผ่านแพลตฟอร์ม (คิดค่าส่งตามระยะทางจริง)' : 'Platform car delivery (fee calculated by distance)'}\n` +
      `--------------------------------------\n` +
      `${language === 'th' ? 'ต้องการปรึกษารายละเอียดผลไม้และรอบเวลาจัดส่งครับ/ค่ะ' : 'Please provide delivery schedule availability and catering options on LINE OA.'}`;

    setActiveLineMessage(msg);
    setIsLineModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Banner */}
      <div className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-surface-container-lowest/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-secondary-fixed uppercase tracking-wider">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>{t('eventHeroBadge')}</span>
            </span>
            <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {t('minOrder10Badge')}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            {t('eventHeroTitle')}
          </h1>

          <p className="text-xs sm:text-sm text-on-primary-container leading-relaxed">
            {t('eventHeroDesc')}
          </p>

          <div className="pt-2">
            <button
              onClick={handleEventLineInquiry}
              className="bg-line-green hover:bg-line-dark text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('eventSendInquiry')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Bulk Quantity Calculator */}
      <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <div>
            <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
              {language === 'th' ? 'คำนวณงบประมาณทันใจ' : 'Instant Estimate'}
            </span>
            <h2 className="font-serif text-2xl text-primary font-semibold">
              {t('eventCalcTitle')}
            </h2>
            <p className="text-xs text-on-surface-variant">
              {t('eventCalcSub')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/40 px-3 py-1.5 rounded-xl text-xs text-secondary font-semibold self-start sm:self-auto">
            <AlertCircle className="w-4 h-4" />
            <span>{t('min10Notice')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <label className="font-semibold text-xs text-primary uppercase tracking-wider block">
              {t('eventSliderLabel')}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={boxQuantity}
                onChange={(e) => setBoxQuantity(Math.max(10, parseInt(e.target.value)))}
                className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
              />
              <span className="font-serif text-2xl font-bold text-primary min-w-[60px] text-right">
                {boxQuantity} {language === 'th' ? 'กล่อง' : 'box'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border text-center ${boxQuantity >= 10 && boxQuantity < 20 ? 'bg-primary text-on-primary font-semibold' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40'}`}>
                <span>10 - 19 {language === 'th' ? 'กล่อง' : 'Boxes'}</span>
                <span className="block font-bold mt-0.5">฿150 / {language === 'th' ? 'กล่อง' : 'box'}</span>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${boxQuantity >= 20 && boxQuantity < 50 ? 'bg-primary text-on-primary font-semibold' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40'}`}>
                <span>20 - 49 {language === 'th' ? 'กล่อง' : 'Boxes'}</span>
                <span className="block font-bold mt-0.5">฿135 / {language === 'th' ? 'กล่อง' : 'box'}</span>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${boxQuantity >= 50 ? 'bg-secondary text-on-secondary font-semibold' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40'}`}>
                <span>50+ {language === 'th' ? 'กล่อง' : 'Boxes'}</span>
                <span className="block font-bold mt-0.5">฿120 / {language === 'th' ? 'กล่อง' : 'box'}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 space-y-4 text-center">
            <span className="text-xs text-on-surface-variant uppercase font-semibold block">
              {t('eventEstTotal')}
            </span>
            <div className="font-serif text-4xl font-bold text-primary">
              ฿{estimatedTotal.toLocaleString('th-TH')}
            </div>
            <p className="text-xs text-secondary font-semibold">
              ฿{unitPrice.toLocaleString('th-TH')} {t('eventPerBox')} ({boxQuantity} {language === 'th' ? 'ท่าน/กล่อง' : 'guests/boxes'})
            </p>
            <button
              onClick={handleEventLineInquiry}
              className="w-full bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('eventSendInquiry')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini Products Listing */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl text-primary font-semibold">
          {language === 'th' ? 'เซ็ตผลไม้จัดเบรค & อาหารว่าง (ขั้นต่ำ 10 กล่อง)' : 'Event, Workshop & Activity Refreshments (Min. 10 Packs)'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {miniBoxes.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
