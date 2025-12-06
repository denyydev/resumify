"use client"

import { Layout, Typography } from "antd"
import { useParams } from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import type { Locale } from "@/lib/useCurrentLocale"

const { Title, Text } = Typography

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle: "Заполняй данные слева и сразу смотри превью справа.",
    previewTitle: "Превью резюме",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill the form on the left and see live preview on the right.",
    previewTitle: "Resume preview",
  },
} as const

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const dict = messages[locale]

  const resumeId = locale === "en" ? "demo-en" : "demo"

  return (
    <Layout className="min-h-screen bg-slate-100">
      <Layout.Header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="py-3">
            <Title level={4} className="!mb-0">
              {dict.editorTitle}
            </Title>
            <Text type="secondary" className="text-xs">
              {dict.editorSubtitle}
            </Text>
          </div>

          <div className="flex items-center gap-3 py-3">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </Layout.Header>

      <Layout.Content className="py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row">
          <div className="w-full lg:w-[52%]">
            <EditorShell />
          </div>

          <div className="w-full lg:w-[48%] space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium text-slate-600">
                {dict.previewTitle}
              </span>
              <DownloadPdfButton resumeId={resumeId} locale={locale} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
              <ResumePreview />
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}
