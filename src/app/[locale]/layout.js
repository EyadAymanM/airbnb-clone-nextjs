import localFont from "next/font/local";
import "./globals.css";
import Provider from "../_components/Providers/Provider";
import ToastProvider from "../_components/Providers/ToastProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const airbnbCerealArabic = localFont({
  src: "./fonts/AirbnbCerealVF_Arabic_W_Wght.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const airbnbCereal = localFont({
  src: "./fonts/AirbnbCerealVF_W_Wght.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb | book trips anywhere",
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isRtl = locale === 'ar';

  const messages = await getMessages();

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="scroll-smooth">
      <body
        className={`${airbnbCereal.variable} ${airbnbCerealArabic.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Provider>
            {/* <SessionContextProvider> */}
              <ToastProvider />
              {children}
            {/* </SessionContextProvider> */}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
