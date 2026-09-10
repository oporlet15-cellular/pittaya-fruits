'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { LINE_OA_CONFIG } from '@/lib/productsData';
import { Edit3, MessageSquare, Gift } from 'lucide-react';

interface CalligraphyCardBuilderProps {
  onNoteChange?: (note: string) => void;
  initialNote?: string;
}

export default function CalligraphyCardBuilder({
  onNoteChange,
  initialNote,
}: CalligraphyCardBuilderProps) {
  const { setActiveLineMessage, setIsLineModalOpen } = useCart();
  const { t, language } = useLanguage();

  const defaultNote = language === 'th'
    ? 'ด้วยความปรารถนาดี ขอให้มีสุขภาพแข็งแรง และมีความสุขในทุกๆ วัน'
    : 'With deepest gratitude and warmest wishes for health and happiness.';

  const [note, setNote] = useState(initialNote || defaultNote);

  const handleNoteTextChange = (val: string) => {
    setNote(val);
    if (onNoteChange) onNoteChange(val);
  };

  const handleOrderWithNote = () => {
    const msg = `🌿 *${language === 'th' ? 'สั่งทำข้อความการ์ดอวยพรพิเศษ' : 'Custom Gift Note Inquiry'} — ${LINE_OA_CONFIG.storeName}*\n` +
      `--------------------------------------\n` +
      `🎀 *${language === 'th' ? 'ริบบิ้นผ้าไหม:' : 'Silk Ribbon:'}* ${language === 'th' ? 'แถมฟรีพร้อมผูกประณีต' : 'Signature Silk Ribbon Included'}\n` +
      `✍️ *${language === 'th' ? 'ข้อความเขียนการ์ดลายมือ:' : 'Handwritten Note:'}*\n` +
      `"${note}"\n` +
      `--------------------------------------\n` +
      `${language === 'th' ? 'ต้องการจับคู่กับกระเช้าผลไม้ / กล่องของขวัญ ช่วยแนะนำด้วยครับ' : 'I would like to pair this presentation with a fruit basket/box. Please advise options!'}`;

    setActiveLineMessage(msg);
    setIsLineModalOpen(true);
  };

  return (
    <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-outline-variant/40 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-secondary" />
          <h3 className="font-serif text-lg text-primary font-semibold">
            {t('calligraphyTitle')}
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-secondary font-bold bg-surface-container-lowest px-2.5 py-1 rounded border border-outline-variant/30 self-start sm:self-auto">
          {t('calligraphyIncludedBadge')}
        </span>
      </div>

      {/* Note Textarea Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-semibold text-primary uppercase tracking-wider">
            {t('calligraphyLabel')}
          </label>
          <span className="text-on-surface-variant text-[11px]">
            {note.length} / 120 {t('calligraphyCharCount')}
          </span>
        </div>
        <div className="relative">
          <textarea
            value={note}
            onChange={(e) => handleNoteTextChange(e.target.value)}
            maxLength={120}
            rows={2}
            placeholder={t('calligraphyPlaceholder')}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 text-xs text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          />
          <Edit3 className="w-4 h-4 text-outline absolute top-3 right-3 pointer-events-none" />
        </div>
      </div>

      {/* Live Handwritten Parchment Preview Box */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider block">
          {t('calligraphyPreviewLabel')}
        </span>
        <div className="bg-[#F0EFEA] border-2 border-dashed border-secondary/40 rounded-xl p-5 relative shadow-inner text-center space-y-3">
          {/* Decorative Corner Seals */}
          <div className="absolute top-2 left-2 text-[10px] font-serif text-secondary/60 tracking-widest uppercase">
            {LINE_OA_CONFIG.storeName}
          </div>
          <div className="absolute top-2 right-2 text-[10px] text-primary/40 font-mono">
            LOT #MIZUMONO
          </div>

          <div className="pt-3 pb-1 px-4">
            <p className="font-script text-2xl sm:text-3xl text-primary leading-relaxed drop-shadow-sm min-h-[4rem] flex items-center justify-center">
              "{note || (language === 'th' ? 'ข้อความเขียนการ์ดจะแสดงตัวอย่างที่นี่...' : 'Your handwritten card preview will render here...')}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 border-t border-outline-variant/40 text-[11px] text-on-surface-variant">
            <span>{t('calligraphyInkNotice')}</span>
            <span>•</span>
            <span className="text-secondary font-medium">{t('calligraphySilkNotice')}</span>
          </div>
        </div>
      </div>

      {/* Direct LINE OA Order CTA */}
      <button
        type="button"
        onClick={handleOrderWithNote}
        className="w-full bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>{t('calligraphyConsultBtn')}</span>
      </button>
    </div>
  );
}
