"use client";

import type { TemplateKey } from "@/components/resume/templates";
import { templateMap } from "@/components/resume/templates";
import { NeoTemplate } from "@/components/resume/templates/NeoTemplate";
import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";

type Props = {
  data: Resume;
  locale: Locale;
  templateKey: TemplateKey;
};

export function ResumePrint({ data, locale, templateKey }: Props) {
  const Template = templateMap[templateKey] ?? NeoTemplate;
  return <Template data={data} locale={locale} />;
}
