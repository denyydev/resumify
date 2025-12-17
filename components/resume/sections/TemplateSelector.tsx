"use client"

import { useResumeStore } from "@/store/useResumeStore"
import type { TemplateKey } from "@/types/resume"
import { Check } from "lucide-react"
import { useCurrentLocale } from "@/lib/useCurrentLocale"

type LocaleKey = "ru" | "en"

const templateLabels: Record<
  TemplateKey,
  {
    icon: string
    title: Record<LocaleKey, string>
    subtitle: Record<LocaleKey, string>
  }
> = {
  classic: {
    icon: "📄",
    title: { ru: "Классический", en: "Classic" },
    subtitle: {
      ru: "Макет с сайдбаром и тёмным акцентом",
      en: "Sidebar layout with dark accent",
    },
  },
  minimal: {
    icon: "✨",
    title: { ru: "Минимал", en: "Minimal" },
    subtitle: {
      ru: "Чистый одноколоночный макет",
      en: "Clean single-column layout",
    },
  },
  modern: {
    icon: "🚀",
    title: { ru: "Современный", en: "Modern" },
    subtitle: {
      ru: "Компактный двухколоночный макет",
      en: "Compact two-column layout",
    },
  },
  simple: {
    icon: "📝",
    title: { ru: "Простой", en: "Simple" },
    subtitle: {
      ru: "Прямолинейный одноколоночный макет",
      en: "Straightforward single-column resume",
    },
  },
  timeline: {
    icon: "⏱️",
    title: { ru: "Таймлайн", en: "Timeline" },
    subtitle: {
      ru: "Акцент на опыте в виде таймлайна",
      en: "Experience-focused timeline layout",
    },
  },
  grid: {
    icon: "🔲",
    title: { ru: "Сетка", en: "Grid" },
    subtitle: {
      ru: "Структурированный макет карточками",
      en: "Card-based structured layout",
    },
  },
}

const messages = {
  ru: {
    title: "Выберите шаблон",
    subtitle: "Этот шаблон будет использован для экспорта PDF",
  },
  en: {
    title: "Select template",
    subtitle: "This template will be used for PDF export",
  },
} as const

export function TemplateSelector() {
  const localeRaw = useCurrentLocale()
  const locale: LocaleKey = localeRaw === "en" ? "en" : "ru"
  const t = messages[locale]

  const templateKey = useResumeStore((s) => s.resume.templateKey)
  const setTemplateKey = useResumeStore((s) => s.setTemplateKey)

  const options: TemplateKey[] = ["classic", "minimal", "modern", "simple", "timeline", "grid"]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{t.title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((key) => {
          const active = templateKey === key
          const template = templateLabels[key]

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTemplateKey(key)}
              className={`group cursor-pointer relative w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                active
                  ? "border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-slate-400 hover:shadow-md"
              }`}
            >
              {active && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <Check className="w-3 h-3 text-slate-900" />
                </div>
              )}

              <span className="text-xl">{template.icon}</span>

              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm font-semibold block ${
                    active ? "text-white" : "text-slate-900"
                  }`}
                >
                  {template.title[locale]}
                </span>

                <span
                  className={`text-xs leading-relaxed ${
                    active ? "text-slate-200" : "text-slate-600"
                  }`}
                >
                  {template.subtitle[locale]}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
