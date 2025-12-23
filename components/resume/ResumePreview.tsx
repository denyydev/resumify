"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { Resume } from "@/types/resume";
import { FileText } from "lucide-react";

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
      <div>
        <ResumePrint data={resume as Resume} locale={locale} />
        {isEmpty && (
          <div className="mt-6 border border-slate-200 rounded-xl bg-linear-to-br from-slate-50 to-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              {t.emptyTitle}
            </p>
            <p className="text-xs text-slate-500">{t.emptyDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
