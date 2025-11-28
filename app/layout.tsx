import type { Metadata } from 'next';
import { Noto_Sans_Hebrew } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { DataContextProvider } from '@/context/DataContext';

const notoSansHebrew = Noto_Sans_Hebrew({ subsets: ['hebrew'] });

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
        <DataContextProvider>
          {children}
          <Toaster />
        </DataContextProvider>
      </body>
    </html>
  );
}
