import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n';
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
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Handle unknown locales
    if (!locales.includes(locale as any)) notFound();

    // Load the right messages
    const messages = (await import(`../../public/locales/${locale}/messages.json`)).default;

    return (
        <html lang={locale}>
            <head>
                {/* Google Analytics & Ads */}
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
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
