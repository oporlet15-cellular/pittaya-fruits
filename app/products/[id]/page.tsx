'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/productsData';
import { BasketSize, BasketTier } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { useLanguage } from '@/lib/languageContext';
import CalligraphyCardBuilder from '@/components/CalligraphyCardBuilder';
import { MessageSquare, ArrowLeft, Check, Sparkles, ShieldCheck, Truck, ShoppingBag, AlertCircle, Gift } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { t, language } = useLanguage();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl text-primary">{language === 'th' ? 'ไม่พบสินค้าที่คุณต้องการ' : 'Product Not Found'}</h1>
        <Link href="/products" className="text-secondary underline text-sm">
          {language === 'th' ? 'กลับไปหน้าสินค้าทั้งหมด' : 'Return to Collections'}
        </Link>
      </div>
    );
  }

  const { addToCart, openLineOrderForProduct } = useCart();

  const isMiniBox = product.category === 'mini-box';

  const [selectedSize, setSelectedSize] = useState<BasketSize>(
    product.availableSizes ? product.availableSizes[0].size : '12"'
  );
  const [selectedTier, setSelectedTier] = useState<BasketTier>(
    product.availableTiers ? product.availableTiers[0].tier : 'Standard'
  );
  const [customNote, setCustomNote] = useState(
    language === 'th'
      ? 'ขอให้มีความสุข สุขภาพร่างกายแข็งแรง สมปรารถนาในทุกสิ่งครับ'
      : 'With deepest gratitude and celebration of the season.'
  );
  const [quantity, setQuantity] = useState(isMiniBox ? 10 : 1);

  // Compute calculated price
  let unitPrice = product.basePrice;
  if (product.category === 'basket' && product.availableSizes) {
    const sObj = product.availableSizes.find((s) => s.size === selectedSize);
    if (sObj) unitPrice += sObj.priceModifier;

    if (selectedTier === 'Premium' && product.availableTiers) {
      const tObj = product.availableTiers.find((t) => t.tier === 'Premium');
      if (tObj) unitPrice += tObj.priceModifier;
    }
  }

  // Handle bulk discount for mini boxes
  if (product.bulkDiscounts) {
    const applicable = [...product.bulkDiscounts]
      .sort((a, b) => b.minQuantity - a.minQuantity)
      .find((d) => quantity >= d.minQuantity);
    if (applicable) unitPrice = applicable.pricePerUnit;
  }

  const totalPrice = unitPrice * quantity;
  const formattedTotalPrice = totalPrice.toLocaleString('th-TH');
  const formattedUnitPrice = unitPrice.toLocaleString('th-TH');

  const handleOrderOnLine = () => {
    openLineOrderForProduct(product, {
      size: product.category === 'basket' ? selectedSize : undefined,
      tier: product.category === 'basket' ? selectedTier : undefined,
      ribbon: 'Signature Atelier Silk Ribbon',
      customNote,
      quantity,
    });
  };

  const handleAddToBag = () => {
    addToCart(product, {
      size: product.category === 'basket' ? selectedSize : undefined,
      tier: product.category === 'basket' ? selectedTier : undefined,
      ribbon: 'Signature Atelier Silk Ribbon',
      customNote,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'th' ? 'กลับไปหน้าสินค้าทั้งหมด' : 'Back to Collections'}</span>
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/40 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-primary shadow-sm">
                {language === 'th' ? 'คัดสดใหม่ทุกวัน' : 'Fresh Daily'}
              </span>
              {isMiniBox && (
                <span className="bg-secondary text-on-secondary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {t('minOrder10Badge')}
                </span>
              )}
              <span className="bg-primary text-on-primary px-3 py-1 rounded-lg text-xs font-mono">
                {product.lotNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-on-surface-variant text-center">
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <ShieldCheck className="w-4 h-4 text-secondary mx-auto mb-1" />
              <span className="font-semibold text-primary block">{language === 'th' ? 'รับประกันความสดใหม่' : 'Freshness Guaranteed'}</span>
              <span>{language === 'th' ? 'คัดผลไม้สดทุกวัน' : 'Hand-Selected Daily'}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <Truck className="w-4 h-4 text-secondary mx-auto mb-1" />
              <span className="font-semibold text-primary block">{language === 'th' ? 'จัดส่งรถยนต์ถึงที่' : 'Platform Car Delivery'}</span>
              <span>{language === 'th' ? 'คิดตามระยะทางจริง' : 'Fee by Distance'}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <Gift className="w-4 h-4 text-secondary mx-auto mb-1" />
              <span className="font-semibold text-primary block">{language === 'th' ? 'บริการผูกริบบิ้นฟรี' : 'Complimentary'}</span>
              <span>{language === 'th' ? 'พร้อมการ์ดเขียนลายมือ' : 'Silk Ribbon & Note'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer & Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-outline-variant/30 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-secondary font-semibold text-xs uppercase tracking-widest block">
                {language === 'th' ? 'สินค้าพรีเมียมคัดสรร' : 'Atelier Selection'}
              </span>
              <span className="bg-line-green/10 text-line-dark text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Gift className="w-3 h-3" />
                {t('freeGiftWrapBadge')}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-primary">{product.name}</h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Header */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-primary">฿{formattedTotalPrice} THB</span>
            {quantity > 1 && (
              <span className="text-xs text-on-surface-variant font-medium">
                (฿{formattedUnitPrice} THB / กล่อง × {quantity} กล่อง)
              </span>
            )}
          </div>

          {/* Baskets Selector: Sizes (12", 14", 16") */}
          {product.category === 'basket' && product.availableSizes && (
            <div className="bg-surface-container-low p-4 rounded-xl space-y-3 border border-outline-variant/40">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-primary uppercase tracking-wider">
                  {t('selectBasketSize')}
                </label>
                <span className="text-secondary font-bold font-serif">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.availableSizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedSize === s.size
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:border-outline'
                    }`}
                  >
                    <span className="font-serif font-bold text-sm block">{s.size}</span>
                    <span className="text-[10px] opacity-80 block truncate">{s.fruitCount}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tier Selector: Standard vs Premium */}
          {product.category === 'basket' && product.availableTiers && (
            <div className="bg-surface-container-low p-4 rounded-xl space-y-3 border border-outline-variant/40">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-primary uppercase tracking-wider">
                  {t('selectTier')}
                </label>
                <span className="text-secondary font-bold font-serif">{selectedTier}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.availableTiers.map((t) => (
                  <button
                    key={t.tier}
                    type="button"
                    onClick={() => setSelectedTier(t.tier)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedTier === t.tier
                        ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:border-outline'
                    }`}
                  >
                    <span className="font-semibold text-xs block">{t.label}</span>
                    <span className="text-[10px] opacity-80 block leading-tight mt-0.5">
                      {t.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper for Event Boxes (Min 10) */}
          {isMiniBox && (
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary uppercase tracking-wider">
                  {t('eventQtyLabel')}
                </span>
                <span className="text-secondary font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t('minOrder10Badge')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(10, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary font-bold text-lg flex items-center justify-center hover:bg-surface-container disabled:opacity-40"
                  disabled={quantity <= 10}
                >
                  -
                </button>
                <span className="font-serif text-xl font-bold text-primary min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary font-bold text-lg flex items-center justify-center hover:bg-surface-container"
                >
                  +
                </button>
                <span className="text-xs text-on-surface-variant italic">
                  (฿{formattedUnitPrice} THB / กล่อง)
                </span>
              </div>
            </div>
          )}

          {/* Calligraphy Gift Builder Module (Included Complimentary) */}
          <CalligraphyCardBuilder
            initialNote={customNote}
            onNoteChange={(n) => setCustomNote(n)}
          />

          {/* Primary Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleOrderOnLine}
              className="w-full bg-line-green hover:bg-line-dark text-white font-semibold py-4 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>{t('btnPreOrderLine')} — ฿{formattedTotalPrice} THB</span>
            </button>

            <button
              onClick={handleAddToBag}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('btnAddToBag')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
