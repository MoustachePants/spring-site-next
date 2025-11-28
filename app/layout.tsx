import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DataContextProvider } from '@/context/DataContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="he" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <DataContextProvider>
          {children}
          <Toaster />
        </DataContextProvider>
      </body>
    </html>
  );
}
