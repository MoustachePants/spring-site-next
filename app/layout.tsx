import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Hebrew } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { DataContextProvider } from '@/context/DataContext';
import Loading from '@/components/loading/Loading/Loading';
import Script from 'next/script';

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
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icons/favicon_dark.svg',
        href: '/icons/favicon_dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icons/favicon_bright.svg',
        href: '/icons/favicon_bright.svg',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    // כתיב תקין – בסיס
    'מעיינות בישראל',
    'נחלים בישראל',
    'מעיינות פתוחים',
    'מעיינות לפי אזור',
    'טיולים עם מים',
    'מעיינות לרחצה',
    'מעיינות קרובים אליי',

    // שגיאות כתיב נפוצות – מעיינות
    'מעינות',
    'מעינות בישראל',
    'מעיינות',
    'מעיינות פתוכים',
    'מעיינות פתוחים היום',
    'מעיינות קרובים אלי',

    // שגיאות – נחלים
    'נחלים',
    'נחלים עם מים',
    'נחלים אם מים',
    'נחליים',
    'נחלים בישראל',

    // שגיאות – טיולים
    'טיולים עם מים',
    'תיולים עם מים',
    'טיולי מים',
    'טיול עם מים',

    // מיקום / כוונת משתמש
    'מעיינות בצפון',
    'מעינות בצפון',
    'מעיינות במרכז',
    'מעינות במרכז',
    'מעיינות בדרום',
    'מעינות בדרום',

    // חיפושים מהירים / מובייל
    'מעיין קרוב',
    'מעין קרוב',
    'מים בטבע',
    'מים בטבע ישראל',
  ],
  openGraph: {
    title: 'המעיין הנובע – מעיינות ונחלים בישראל',
    description: 'כל המעיינות, הנחלים ומאגרי המים בישראל – לפי מיקום, מצב עדכני ועונות השנה.',
    siteName: 'המעיין הנובע',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'המעיין הנובע – מעיינות ונחלים בישראל',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'המעיין הנובע – מעיינות ונחלים בישראל',
    description: 'כל המעיינות, הנחלים ומאגרי המים בישראל – לפי מיקום, מצב עדכני ועונות השנה.',
    images: ['/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    title: 'המעיין הנובע',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning={true}>
      <Script type="text/javascript">
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "un3xqv4mp4");
      </Script>
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
