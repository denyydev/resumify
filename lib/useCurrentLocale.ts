"use client";

import { useParams } from "next/navigation";

export type Locale = "ru" | "en";

export function useCurrentLocale(): Locale {
  const params = useParams<{ locale?: string }>();
  const raw = params?.locale;

  if (raw === "en") return "en";
  return "ru";
}
