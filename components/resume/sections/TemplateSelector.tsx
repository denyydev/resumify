"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { TemplateKey } from "@/types/resume";
import { theme } from "antd";
import { Check } from "lucide-react";

type LocaleKey = "ru" | "en";

const templateLabels: Record<
  TemplateKey,
  {
    icon: string;
    title: Record<LocaleKey, string>;
    subtitle: Record<LocaleKey, string>;
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
};

const messages = {
  ru: {
    title: "Выберите шаблон",
    subtitle: "Этот шаблон будет использован для экспорта PDF",
  },
  en: {
    title: "Select template",
    subtitle: "This template will be used for PDF export",
  },
} as const;

export function TemplateSelector() {
  const { token } = theme.useToken();

  const localeRaw = useCurrentLocale();
  const locale: LocaleKey = localeRaw === "en" ? "en" : "ru";
  const t = messages[locale];

  const templateKey = useResumeStore((s) => s.resume.templateKey);
  const setTemplateKey = useResumeStore((s) => s.setTemplateKey);

  const options: TemplateKey[] = [
    "classic",
    "minimal",
    "modern",
    "simple",
    "timeline",
    "grid",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: token.colorText,
          }}
        >
          {t.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: token.colorTextSecondary,
          }}
        >
          {t.subtitle}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((key) => {
          const active = templateKey === key;
          const template = templateLabels[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTemplateKey(key)}
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                textAlign: "left",
                borderRadius: 12,
                border: `2px solid ${
                  active ? token.colorPrimary : token.colorBorderSecondary
                }`,
                background: active
                  ? token.colorPrimaryBg
                  : token.colorBgContainer,
                color: token.colorText,
                cursor: "pointer",
                transition:
                  "border-color 160ms ease, background 160ms ease, box-shadow 160ms ease",
                boxShadow: active ? token.boxShadowSecondary : "none",
              }}
            >
              {active && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: token.colorBgContainer,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={12} style={{ color: token.colorPrimary }} />
                </div>
              )}

              <span style={{ fontSize: 20 }}>{template.icon}</span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? token.colorPrimaryText : token.colorText,
                  }}
                >
                  {template.title[locale]}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: active
                      ? token.colorTextSecondary
                      : token.colorTextSecondary,
                  }}
                >
                  {template.subtitle[locale]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
