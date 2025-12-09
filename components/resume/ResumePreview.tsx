"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { ResumePrint } from "@/components/resume/ResumePrint"

export function ResumePreview() {
  const { resume } = useResumeStore()
  const locale = useCurrentLocale()

  // На случай, если резюме пустое — можно показать заглушку
  const isEmpty =
    !resume.fullName &&
    !resume.position &&
    !resume.summary &&
    resume.experience.length === 0 &&
    resume.projects.length === 0 &&
    resume.education.length === 0

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[794px] rounded-xl border bg-slate-50 shadow-sm overflow-hidden">
        {/* серый фон как фон страницы */}
        <div className="flex justify-center bg-slate-200/60 p-4">
          <div className="bg-white shadow-sm">
            {/* Тут рендерится тот же компонент, что и для PDF */}
            <ResumePrint data={resume as any} locale={locale} />
          </div>
        </div>

        {isEmpty && (
          <div className="border-t border-slate-200 px-4 py-3 text-[11px] text-slate-500">
            Начни заполнять поля слева и выбери шаблон — превью обновляется
            автоматически и используется при генерации PDF.
          </div>
        )}
      </div>
    </div>
  )
}
