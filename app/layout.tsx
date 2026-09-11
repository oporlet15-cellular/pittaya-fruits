import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { LanguageProvider } from '@/lib/languageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LineChatModal from '@/components/LineChatModal';

export const metadata: Metadata = {
  title: 'Pittaya Fruits (ร้านผลไม้เจ๊อึ่ง) — กระเช้าผลไม้ของขวัญ & เซ็ตผลไม้จัดเบรค',
  description: 'ร้านผลไม้เจ๊อึ่ง (Pittaya Fruits) ประสบการณ์กว่า 20 ปี กระเช้าผลไม้สดคัดพิเศษ กล่องของขวัญ และเซ็ตผลไม้จัดเบรคอีเวนต์ บริการผูกริบบิ้นฟรี สั่งซื้อง่ายทาง LINE OA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Noto+Serif+Thai:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface flex flex-col min-h-screen font-sans selection:bg-secondary/20 selection:text-secondary">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 w-full pt-28 pb-16">{children}</main>
            <Footer />
            <CartDrawer />
            <LineChatModal />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
