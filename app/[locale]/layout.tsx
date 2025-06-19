import type { Locale } from '@/i18n';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
    title: 'Asara Morocco Travel',
    description: 'Explore the beauty of Morocco with Asara Travel',
};

export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string }; // ❗️ Not a Promise — just an object
}) {
    const locale = params.locale;

    // ✅ Type-safe check with no `any`
    if (!locales.includes(locale as Locale)) notFound();
    const typedLocale = locale as Locale;

    const messages = (await import(`../../public/locales/${typedLocale}/messages.json`)).default;

    return (
        <html lang={typedLocale}>
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-K6HNZWCY22"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K6HNZWCY22');
            gtag('config', 'AW-16463312996');
          `}
                </Script>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NextIntlClientProvider locale={typedLocale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
