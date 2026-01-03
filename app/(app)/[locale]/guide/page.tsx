"use client";

import { useParams } from "next/navigation";
import type { Locale } from "@/lib/useCurrentLocale";
import { RecommendationsFaqPage } from "@/components/recommendations/RecommendationsFaqPage";

export default function GuidePage() {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";

  return <RecommendationsFaqPage locale={locale} />;
}
