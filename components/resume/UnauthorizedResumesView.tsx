"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { Button, Card } from "antd";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthButton } from "../layout/AuthButton";

type Props = {
  locale: Locale;
};

const messages = {
  ru: {
    title: "Войдите, чтобы управлять резюме",
    subtitle:
      "Сохраняйте версии, экспортируйте PDF и управляйте шаблонами в одном месте.",
    versions: "Версии",
    versionsDesc: "Храните несколько вариантов под разные вакансии.",
    export: "Экспорт",
    exportDesc: "PDF без сюрпризов: кликабельные ссылки и текстовый слой.",
    templates: "Шаблоны",
    templatesDesc: "Выбирайте стиль под роль: ATS или дизайн.",
    goHome: "На главную",
    createResume: "Создать резюме",
  },
  en: {
    title: "Sign in to manage your resumes",
    subtitle: "Save versions, export PDFs, and manage templates in one place.",
    versions: "Versions",
    versionsDesc: "Keep multiple variants for different jobs.",
    export: "Export",
    exportDesc: "No-surprise PDFs: clickable links and real text layer.",
    templates: "Templates",
    templatesDesc: "Choose ATS-safe or modern styles.",
    goHome: "Go Home",
    createResume: "New Resume",
  },
} as const;

export function UnauthorizedResumesView({ locale }: Props) {
  const router = useRouter();
  const t = messages[locale];

  const createHref = `/${locale}/editor`;

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-[720px] rounded-2xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillTertiary)]">
                <FileText size={20} className="text-[var(--ant-colorText)]" />
              </div>

              <div className="min-w-0">
                <div className="text-xl md:text-2xl font-semibold text-[var(--ant-colorText)]">
                  {t.title}
                </div>
                <div className="mt-1 text-sm text-[var(--ant-colorTextSecondary)]">
                  {t.subtitle}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorBgContainer)] p-4">
                <div className="text-xs font-semibold text-[var(--ant-colorText)]">
                  {t.versions}
                </div>
                <div className="mt-1 text-xs text-[var(--ant-colorTextSecondary)]">
                  {t.versionsDesc}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorBgContainer)] p-4">
                <div className="text-xs font-semibold text-[var(--ant-colorText)]">
                  {t.export}
                </div>
                <div className="mt-1 text-xs text-[var(--ant-colorTextSecondary)]">
                  {t.exportDesc}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorBgContainer)] p-4">
                <div className="text-xs font-semibold text-[var(--ant-colorText)]">
                  {t.templates}
                </div>
                <div className="mt-1 text-xs text-[var(--ant-colorTextSecondary)]">
                  {t.templatesDesc}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button onClick={() => router.push(`/${locale}`)}>
                {t.goHome}
              </Button>

              <AuthButton />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
