export const locales = ["en", "zh", "it", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
