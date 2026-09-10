'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { LINE_OA_CONFIG } from '@/lib/productsData';
import { X, MessageSquare, Copy, Check, QrCode, ExternalLink, Sparkles } from 'lucide-react';

export default function LineChatModal() {
  const { isLineModalOpen, setIsLineModalOpen, activeLineMessage } = useCart();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isLineModalOpen) return null;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(activeLineMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLineApp = () => {
    if (activeLineMessage) {
      navigator.clipboard.writeText(activeLineMessage);
    }
    window.open(LINE_OA_CONFIG.lineUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-surface-container-lowest w-full max-w-lg rounded-2xl border border-outline-variant shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary text-on-primary p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-line-green text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-on-primary font-medium tracking-wide">
                {language === 'th' ? 'สั่งซื้อ & ยืนยันรายการใน LINE OA' : 'Finalize Deal on LINE OA'}
              </h3>
              <p className="text-xs text-on-primary-container">
                {LINE_OA_CONFIG.storeName} — LINE ID: <strong className="text-secondary-fixed">{LINE_OA_CONFIG.lineId}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLineModalOpen(false)}
            className="p-1.5 text-on-primary-container hover:text-on-primary hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-on-surface">
          {/* Instructions */}
          <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {language === 'th'
                ? 'ระบบได้จัดรูปแบบสรุปรายการผลไม้ของคุณไว้ด้านล่างนี้แล้ว เมื่อกด "เปิดแชท LINE OA" ข้อความจะถูกส่งให้แอดมินช่วยดูแลและคอนเฟิร์มรอบส่งทันทีครับ'
                : 'Your customized order specifications have been formatted below. Clicking "Open LINE OA Chat" will transfer these details directly to our sommelier.'}
            </p>
          </div>

          {/* Pre-Formatted Message Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span className="font-semibold uppercase tracking-wider">
                {language === 'th' ? 'ข้อความสรุปรายการสั่งซื้อ:' : 'Order Summary Message:'}
              </span>
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-secondary hover:underline font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'th' ? 'คัดลอกแล้ว!' : 'Copied!') : (language === 'th' ? 'คัดลอกข้อความ' : 'Copy Text')}</span>
              </button>
            </div>
            <div className="bg-surface-container p-3.5 rounded-xl text-xs font-mono text-primary leading-relaxed whitespace-pre-wrap border border-outline-variant/30 select-all max-h-48 overflow-y-auto">
              {activeLineMessage || (language === 'th' ? 'สอบถามสั่งซื้อผลไม้...' : 'Inquiring about fruit basket availability...')}
            </div>
          </div>

          {/* Desktop QR Code & Mobile Launch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-outline-variant/40 shadow-sm text-center">
              <img
                src={LINE_OA_CONFIG.qrCodeImage}
                alt="LINE Official QR Code"
                className="w-32 h-32 object-contain rounded-lg mb-2 shadow-sm border border-outline-variant/30 p-1 bg-white"
              />
              <span className="text-[11px] text-primary font-semibold">LINE OA ร้านผลไม้เจ๊อึ่ง</span>
              <a
                href={LINE_OA_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-secondary hover:underline mt-0.5 font-mono"
              >
                lin.ee/5zUrw47
              </a>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-primary">
                {language === 'th' ? 'ขั้นตอนง่ายๆ ในการสั่ง:' : 'How to complete order:'}
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-on-surface-variant text-[12px]">
                {language === 'th' ? (
                  <>
                    <li>กดปุ่มด้านล่างเพื่อเปิดแชท LINE OA</li>
                    <li>ส่งข้อความสรุปรายการสั่งซื้อในแชท</li>
                    <li>คอนเฟิร์มรอบเวลาส่งและสลิปโอนเงิน</li>
                  </>
                ) : (
                  <>
                    <li>Click button below to open LINE OA.</li>
                    <li>Paste or send the generated text message.</li>
                    <li>Confirm delivery date & payment slip.</li>
                  </>
                )}
              </ol>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleOpenLineApp}
            className="flex-1 bg-line-green hover:bg-line-dark text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{language === 'th' ? 'เปิดแชท LINE OA ทันที' : 'Open LINE OA Chat Now'}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsLineModalOpen(false)}
            className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant text-on-surface-variant font-medium py-3 px-4 rounded-xl text-sm transition-colors"
          >
            {language === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
