---
name: Artisanal Orchard
colors:
  surface: '#f9f9f6'
  surface-dim: '#dadad7'
  surface-bright: '#f9f9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#434842'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#747871'
  outline-variant: '#c4c8c0'
  surface-tint: '#526351'
  primary: '#0f1e10'
  on-primary: '#ffffff'
  primary-container: '#243324'
  on-primary-container: '#8a9c88'
  inverse-primary: '#bacbb6'
  secondary: '#a13f25'
  on-secondary: '#ffffff'
  secondary-container: '#fd8364'
  on-secondary-container: '#721c06'
  tertiary: '#111e10'
  on-tertiary: '#ffffff'
  tertiary-container: '#253324'
  on-tertiary-container: '#8c9c88'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e8d1'
  primary-fixed-dim: '#bacbb6'
  on-primary-fixed: '#101f11'
  on-primary-fixed-variant: '#3b4b3a'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0700'
  on-secondary-fixed-variant: '#812810'
  tertiary-fixed: '#d7e7d1'
  tertiary-fixed-dim: '#bbcbb6'
  on-tertiary-fixed: '#111f11'
  on-tertiary-fixed-variant: '#3c4b3a'
  background: '#f9f9f6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display:
    fontFamily: Noto Serif
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Noto Serif
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 46px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  space-4xl: 6rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2.5rem
  container-max: 1360px
---

## Brand & Style

This design system embodies the serene discipline of an atelier paired with the raw bounty of rare fruit cultivation. It captures the reverence of Japanese fruit gifting (mizumono) translated through contemporary editorial minimalism. The aesthetic rejects typical fast-paced e-commerce noise in favor of an unhurried, gallery-grade exhibition of nature’s most pristine harvest.

The interface prioritizes breathing room, tangible stillness, and architectural restraint. Products are treated like sculptural art pieces—highlighted against soft linen and paper surfaces rather than stark digital whites. Every interaction communicates deliberate care, tactile craftsmanship, and heirloom quality.

## Colors

The palette draws directly from botanical life and kiln-fired ceramics:

- **Primary (`#243324` - Deep Forest Olive):** A grounding, near-black evergreen tone serving as the core anchor for dominant calls to action, high-contrast display typography, and structured dividers.
- **Secondary (`#BD5338` - Rich Terracotta):** An earthy, warm clay tone reserved for selective accents, seasonal ribbon tags, highlights, and contextual interaction states.
- **Tertiary (`#8A9A86` - Dried Sage):** A muted leafy mid-tone used for secondary metadata, subtle decorative strokes, iconography, and atmospheric surface tints.
- **Neutral Background (`#FAFAF7` - Washed Alabaster):** A luminous, warm off-white that prevents clinical glare and creates a paper-like, tactile baseline across all viewports.
- **Neutral Surface Accent (`#F0EFEA` - Raw Linen):** A subtle step down from the canvas background to frame product cards and tertiary structural modules without relying on drop shadows.
- **Border Neutral (`#E3E1D8` - Thread Gray):** A delicate, low-contrast boundary line for crisp structural separation.

## Typography

The typographic hierarchy pairs the literary authority of **Noto Serif** with the engineered geometric clarity of **Plus Jakarta Sans**. 

- **Editorial Serifs (`Noto Serif`):** Reserved strictly for displays, headlines, narrative quotes, and seasonal origin stories. Set with tight tracking to accentuate elegance without sacrificing legibility.
- **Modern Sans (`Plus Jakarta Sans`):** Handles all transactional clarity, specs (Brix sweetness levels, orchard coordinates, harvest dates), interface controls, and multi-paragraph body text. 
- **Micro Labels:** Rendered in uppercase with generous tracking (`0.06em` to `0.08em`) to mimic museum archival tags or high-end apothecary packaging.

## Layout & Spacing

The layout is governed by a 12-column fixed-max grid framed by generous margins, instilling a feeling of an open, airy gallery floor.

- **Desktop (1024px+):** Max container width of 1360px with 2.5rem gutters and expansive vertical section padding (`space-3xl` to `space-4xl`). Asymmetrical column splits (e.g., 5-column editorial context paired with a 7-column imagery grid) honor breathing room.
- **Tablet (768px - 1023px):** 8-column layout with 1.5rem gutters. Product listings transition from 4-column to 2-column displays.
- **Mobile (<768px):** 4-column fluid layout with 1rem gutters and edges. Full-bleed edge-to-edge product photography pairs with inset text margins to optimize handheld exploration.
- **Rhythm:** Generous whitespace around solitary elements replaces heavy dividers or decorative backgrounds, forcing attention onto the fruit varieties.

## Elevation & Depth

Visual hierarchy is established strictly through planar surface contrast and micro-borders rather than standard cast drop shadows:

- **Tonal Tiers:** Surfaces sit directly upon the canvas (`#FAFAF7`). Secondary interactive surfaces and drawers use an ivory wash (`#F0EFEA`).
- **Subtle Micro-Borders:** A single-pixel rule (`1px solid #E3E1D8`) defines panels, cards, and modal containers. This reinforces a crisp, hand-bound stationery aesthetic.
- **Atmospheric Float (Hover & Overlays):** To preserve flatness while honoring depth, popovers and modal drawers employ an ultra-diffused, tinted shadow: `0 16px 40px -12px rgba(36, 51, 36, 0.06)`. Heavy drop shadows are strictly forbidden.

## Shapes

The design system maintains a tailored, architectural silhouette with a "Soft" (`1`) roundedness profile.

- **Standard Elements (Buttons, Inputs, Cards):** Built with subtle `0.25rem` (4px) corner radiuses, softening hard corners while remaining structured and tailored.
- **Pills & Circular Containers:** Reserved exclusively for seasonal tags, flavor profile chips, or floating badge markers to create deliberate geometry contrast against rectangular image frames.
- **Image Aspect Ratios:** Structured strictly in editorial aspect ratios (4:5 portrait, 1:1 square, or 16:9 landscape) framed with 1px inset borders to simulate fine print mounts.

## Components

### Buttons
- **Primary:** Solid Deep Forest Olive (`#243324`) background with neutral text (`#FAFAF7`). Sharp, understated hover state shifting gracefully to a slightly lighter botanical tint (`#324632`). Flat surface, no shadow, padding `12px 24px`.
- **Secondary / Outline:** Background transparent, border `1px solid #243324`, text `#243324`. On hover, fills with `#243324` with `#FAFAF7` text.
- **Tertiary / Link:** Unbordered text link in Terracotta (`#BD5338`) with an animated 1px underline that expands smoothly on hover.

### Chips & Badges
- **Origin & Brix Badges:** Compact labels with `0.25rem` border radius or pill shapes, styled with `#F0EFEA` background and `#243324` text, bordered by `1px solid #E3E1D8`.
- **Seasonal Alerts:** Terracotta wash (`#BD5338` at 10% opacity) with solid `#BD5338` typography for limited-harvest announcements.

### Product Cards
- Flat container with no drop shadow, encased in a delicate `1px solid #E3E1D8` border.
- Image takes the top 70% with a warm neutral matte background.
- Meta row displays Brix sweetness index and region in `label-sm` uppercase.
- Title rendered in `headline-sm` (`Noto Serif`), accompanied by a clear, unhurried price presentation.

### Form Inputs & Selectors
- Background filled with `#FFFFFF` or pristine `#FAFAF7`.
- Default border: `1px solid #E3E1D8`. Focus state: `1px solid #243324` with zero outer glow.
- Labels float cleanly above in `label-md` with tracking. Helper text sits quiet and legible in Sage (`#8A9A86`).

### Checkboxes & Radios
- Square / circular controls with `1px solid #243324`.
- Active state fills cleanly with `#243324` featuring an ultra-crisp white botanical check or interior dot.

### Specialized Gifting Components
- **Gift Note Parchment Module:** A dedicated textured container styled with `#F0EFEA` background, dashed border (`1px dashed #BD5338`), and handwritten script preview typography for custom calligraphy inclusions.
- **Ripeness / Harvest Timeline:** A minimal horizontal progress rail charting stages (e.g., "Harvested" -> "Cured" -> "Peak Brix" -> "Delivered") using muted terracotta markers and 1px olive connector lines.