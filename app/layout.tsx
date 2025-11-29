import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Hebrew } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { DataContextProvider } from '@/context/DataContext';
import Loading from '@/components/loading/Loading/Loading';

const notoSansHebrew = Noto_Sans_Hebrew({ subsets: ['hebrew'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'המעיין הנובע',
  description:
    'מחפשים מקום לטבול? לשכשך רגליים? עדכונים שוטפים על מאות מעיינות, מאגרי מים ונחלים בסידור שמותאם למיקום שלכם!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning={true}>
      <body className={notoSansHebrew.className}>
        <Suspense fallback={<Loading />}>
          <DataContextProvider>
            {children}
            <Toaster />
          </DataContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
