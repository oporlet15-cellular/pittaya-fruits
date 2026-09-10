'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Sun, Thermometer, Sparkles, Truck } from 'lucide-react';

export default function RipenessTimeline() {
  const { language } = useLanguage();

  const steps = language === 'th' ? [
    {
      title: 'คัดผลผลิตยามเช้า',
      desc: 'คัดเก็บสดใหม่ทุกเช้าตรู่จากสวนผลไม้ชั้นนำที่ได้มาตรฐาน',
      icon: Sun,
      status: 'complete',
    },
    {
      title: 'บ่มพักในห้องเย็น',
      desc: 'พักรักษาความสดที่อุณหภูมิ 12°C ควบคุมความชื้นอย่างแม่นยำ',
      icon: Thermometer,
      status: 'complete',
    },
    {
      title: 'ตรวจวัดความหวาน Brix',
      desc: 'ตรวจวัดความหวานด้วย Refractometer ที่ระดับ 15° – 18° Brix',
      icon: Sparkles,
      status: 'active',
    },
    {
      title: 'รถส่งควบคุมความเย็น',
      desc: 'จัดส่งด่วนในวันด้วยรถตู้แช่เย็น ส่งตรงถึงมือผู้รับทั่วกรุงเทพฯ',
      icon: Truck,
      status: 'upcoming',
    },
  ] : [
    {
      title: 'Dawn Harvest',
      desc: 'Hand-harvested at sunrise from exclusive partnered orchards.',
      icon: Sun,
      status: 'complete',
    },
    {
      title: 'Cold-Vault Cure',
      desc: 'Rested in 12°C humidity-controlled botanical vaults.',
      icon: Thermometer,
      status: 'complete',
    },
    {
      title: 'Peak Brix Rating',
      desc: 'Refractometer sweetness index tested (15° – 18° Brix).',
      icon: Sparkles,
      status: 'active',
    },
    {
      title: 'Same-Day Courier',
      desc: 'Dispatched in thermal insulated presentation vessels.',
      icon: Truck,
      status: 'upcoming',
    },
  ];

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-4">
        <div>
          <h3 className="font-serif text-lg text-primary font-semibold">
            {language === 'th' ? 'มาตรฐานการคัดสรร & วัดระดับความหวาน' : 'Botanical Harvest & Ripeness Protocol'}
          </h3>
          <p className="text-xs text-on-surface-variant">
            {language === 'th' ? 'ส่งมอบความสดฉ่ำและคุณภาพระดับพรีเมียมจากสวนสู่มือผู้รับ' : 'Gallery-grade freshness assurance from tree to recipient'}
          </p>
        </div>
        <span className="bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
          {language === 'th' ? 'รับประกันความสด & ความหวาน 100%' : '100% Ripeness Warranty'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = step.status === 'active';
          const isComplete = step.status === 'complete';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isActive
                  ? 'bg-surface-container-lowest border-secondary shadow-sm ring-1 ring-secondary/20'
                  : 'bg-surface-container-lowest/60 border-outline-variant/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isActive
                      ? 'bg-secondary text-on-secondary shadow-md'
                      : isComplete
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-outline'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-outline">
                  STAGE 0{idx + 1}
                </span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-primary mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
