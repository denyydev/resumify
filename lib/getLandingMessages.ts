import type { Locale } from "@/app/i18n";
import enMessages from "@/app/en.json";
import ruMessages from "@/app/ru.json";

const messages = {
  en: enMessages,
  ru: ruMessages,
} as const;

export function getLandingMessages(locale: Locale = "ru") {
  return messages[locale]?.landing || messages.ru.landing;
}

