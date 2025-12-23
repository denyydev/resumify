"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { Resume } from "@/types/resume";

const messages = {
  ru: {
    emptyTitle: "Резюме пустое",
    emptyDescription:
      "Начните заполнять поля в редакторе и выберите шаблон — превью обновляется автоматически",
  },
  en: {
    emptyTitle: "Resume is empty",
    emptyDescription:
      "Start filling in the fields in the editor and select a template — preview updates automatically",
  },
} as const;

export function ResumePreview() {
  const { resume } = useResumeStore();
  const locale = useCurrentLocale();
  const t = messages[locale === "en" ? "en" : "ru"];

  const isEmpty =
    !resume.fullName &&
    !resume.position &&
    !resume.summary &&
    resume.experience.length === 0 &&
    resume.projects.length === 0 &&
    resume.education.length === 0;

  return (
    <div className="flex justify-center">
      <ResumePrint data={resume as Resume} locale={locale} />
    </div>
  );
}
