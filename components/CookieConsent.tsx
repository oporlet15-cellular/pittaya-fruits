'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Cookie, ShieldCheck, X, ChevronRight, Check } from 'lucide-react';

export default function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem('pittaya_cookie_consent');
    if (!consent) {
      // Show banner smoothly after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pittaya_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem('pittaya_cookie_consent', 'necessary_only');
    setIsVisible(false);
    setShowPolicyModal(false);
  };

  if (!isVisible && !showPolicyModal) return null;

  return (
    <>
      {/* Floating Bottom Cookie Banner */}
      {isVisible && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 animate-fade-in-up"
        >
          <div className="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/60 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span>{language === 'th' ? 'การใช้งานคุกกี้ & PDPA' : 'Cookie & Privacy Notice'}</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {language === 'th'
                    ? 'เว็บไซต์นี้ใช้คุกกี้และหน่วยความจำในอุปกรณ์เพื่อจดจำสินค้าในตะกร้า ภาษาที่เลือก และมอบประสบการณ์การสั่งซื้อผลไม้ที่ราบรื่นที่สุด'
                    : 'This site uses cookies and local storage to remember your cart items, language preference, and ensure a seamless ordering experience.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/30 text-xs">
              <button
                type="button"
                onClick={() => setShowPolicyModal(true)}
                className="text-[11px] font-semibold text-secondary hover:text-primary transition-colors underline underline-offset-2 flex items-center gap-0.5"
              >
                <span>{language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Details'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="bg-primary hover:bg-primary-container text-on-primary font-semibold px-4 py-2 rounded-xl text-xs transition-all active:scale-95 shadow-sm flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'th' ? 'ยอมรับ' : 'Accept'}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Privacy & Cookie Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h3>{language === 'th' ? 'นโยบายคุกกี้และความเป็นส่วนตัว' : 'Cookie & Privacy Policy'}</h3>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-on-surface-variant space-y-3.5 leading-relaxed">
              <p>
                <strong>ร้านผลไม้เจ๊อึ่ง (Pittaya Fruits)</strong>{' '}
                {language === 'th'
                  ? 'ให้ความสำคัญสูงสุดกับความปลอดภัยและการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งาน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)'
                  : 'values your privacy and complies with the Personal Data Protection Act (PDPA).'}
              </p>

              <div className="space-y-2 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
                <h4 className="font-semibold text-primary">
                  {language === 'th' ? '1. คุกกี้ที่จำเป็น (Strictly Necessary Cookies/Storage)' : '1. Strictly Necessary Cookies'}
                </h4>
                <p>
                  {language === 'th'
                    ? 'ใช้เพื่อการทำงานพื้นฐานของเว็บไซต์ เช่น การจดจำรายการกระเช้าผลไม้ในตะกร้าสินค้า (Cart), ภาษาที่เลือก (ไทย/อังกฤษ), และการบันทึกสถานะการยอมรับนโยบายนี้ ข้อมูลเหล่านี้ถูกจัดเก็บบนอุปกรณ์ของคุณและไม่มีการนำไปใช้เพื่อการระบุตัวตนบุคคลภายนอก'
                    : 'Required for core website functionality, such as remembering your shopping cart items, selected language (TH/EN), and consent preferences.'}
                </p>
              </div>

              <div className="space-y-2 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
                <h4 className="font-semibold text-primary">
                  {language === 'th' ? '2. การส่งต่อข้อมูลและการปิดการขาย' : '2. Data Transfer & Ordering'}
                </h4>
                <p>
                  {language === 'th'
                    ? 'เมื่อคุณกดยืนยันคำสั่งซื้อ ข้อมูลรายการสินค้าและชื่อผู้รับจะถูกส่งต่อไปยังห้องแชท LINE Official Account ของทางร้านโดยตรง เพื่อให้แอดมินประสานงานจัดส่งและออกใบเสร็จ ไม่มีการนำข้อมูลไปขายหรือเผยแพร่เชิงพาณิชย์ใดๆ ทั้งสิ้น'
                    : 'Order details are passed directly to our LINE Official Account for final order confirmation and car delivery coordination. We never sell your personal data.'}
                </p>
              </div>

              <div className="space-y-2 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
                <h4 className="font-semibold text-primary">
                  {language === 'th' ? '3. ติดต่อผู้ควบคุมข้อมูล' : '3. Contact Data Controller'}
                </h4>
                <p>
                  {language === 'th'
                    ? 'ร้านผลไม้เจ๊อึ่ง (Pittaya Fruits) ซอยนวมินทร์ 8 แขวงคลองจั่น เขตบางกะปิ กทม. โทร 082-659-8893 หรือติดต่อผ่าน LINE OA: @pittayafruits'
                    : 'Pittaya Fruits, Soi Nawamin 8, Khlong Chan, Bang Kapi, Bangkok 10240. Tel: 082-659-8893.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/40">
              <button
                type="button"
                onClick={handleDeclineOptional}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                {language === 'th' ? 'ใช้เฉพาะที่จำเป็น' : 'Necessary Only'}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                {language === 'th' ? 'ยอมรับทั้งหมด' : 'Accept All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
