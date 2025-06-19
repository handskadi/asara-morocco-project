'use client';

// Use the standard, built-in hooks from Next.js
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const onLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;

        startTransition(() => {
            // The `usePathname` hook from `next/navigation` includes the current locale.
            // We need to remove the old locale prefix (`/en`, `/it`, etc.)
            // before adding the new one.
            const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
            router.replace(newPath);
        });
    };

    return (
        <div className="relative pl-4 " >
            <select
                defaultValue={locale}
                onChange={onLocaleChange}
                disabled={isPending}
                className="cursor-pointer appearance-none rounded-md bg-transparent py-1 pl-3 pr-8 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50 border-1 border-gray-500"
            >
                <option value="en" className="bg-gray-800 text-white">English</option>
                <option value="it" className="bg-gray-800 text-white">Italiano</option>
                <option value="zh" className="bg-gray-800 text-white">中文</option>
                <option value="fr" className="bg-gray-800 text-white">Français</option>
                <option value="de" className="bg-gray-800 text-white">Deutsch</option>

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}