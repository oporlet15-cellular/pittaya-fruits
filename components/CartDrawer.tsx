'use client';

import React from 'react';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, openLineOrderForCart } = useCart();
  const { t, language } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-surface-container-low border-b border-outline-variant/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-primary font-medium">{t('cartTitle')}</h2>
                <p className="text-xs text-on-surface-variant">{t('cartSub')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-on-surface-variant py-16">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-base text-primary">{t('cartEmpty')}</h3>
                <p className="text-xs max-w-xs">
                  {t('cartEmptySub')}
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg bg-surface-container shrink-0 border border-outline-variant/30"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-primary truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-secondary font-medium">
                        ฿{item.unitPrice.toLocaleString('th-TH')} × {item.quantity} = ฿{item.totalPrice.toLocaleString('th-TH')} THB
                      </p>

                      {/* Selected Config Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-1 text-[11px]">
                        {item.selectedSize && (
                          <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 text-primary font-medium">
                            {language === 'th' ? 'ขนาด' : 'Size'}: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedTier && (
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                            {item.selectedTier}
                          </span>
                        )}
                        <span className="bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 text-on-surface-variant">
                          {language === 'th' ? 'ริบบิ้นผ้าไหม' : 'Silk Ribbon'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-outline hover:text-error transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Custom Card Note Summary if set */}
                  {item.customCardNote && (
                    <div className="bg-surface-container-lowest p-2 rounded-lg text-xs italic text-on-surface border border-outline-variant/30">
                      <span className="text-[10px] uppercase font-semibold text-secondary not-italic block mb-0.5">
                        {language === 'th' ? 'ข้อความบนการ์ด:' : 'Handwritten Note:'}
                      </span>
                      "{item.customCardNote}"
                    </div>
                  )}

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-on-surface-variant">
                      {language === 'th' ? 'จำนวน:' : 'Quantity:'}
                    </span>
                    <div className="flex items-center gap-2 bg-surface-container-lowest px-2 py-1 rounded-lg border border-outline-variant/40">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-primary hover:text-secondary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-xs text-primary min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-primary hover:text-secondary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & LINE OA CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-surface-container-low border-t border-outline-variant/40 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant font-medium">{t('cartTotalLabel')}</span>
                <span className="font-serif text-xl font-bold text-primary">฿{cartTotal.toLocaleString('th-TH')} THB</span>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 text-xs flex items-center gap-2 text-on-surface-variant">
                <Sparkles className="w-4 h-4 text-secondary shrink-0" />
                <span>{t('cartLineNotice')}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openLineOrderForCart();
                }}
                className="w-full bg-line-green hover:bg-line-dark text-white font-semibold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t('cartProceedBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
