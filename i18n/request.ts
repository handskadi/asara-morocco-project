import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "../i18n"; // adjust if needed

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../public/locales/${safeLocale}/messages.json`))
      .default,
  };
});
