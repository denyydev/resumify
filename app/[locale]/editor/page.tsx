"use client"

import { useEffect } from "react"
import { Layout, Typography } from "antd"
import { useParams, useSearchParams } from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import type { Locale } from "@/lib/useCurrentLocale"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"
import { useResumeStore } from "@/store/useResumeStore"

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

  const searchParams = useSearchParams()
  const resumeId = searchParams.get("resumeId")

  const loadResume = useResumeStore((s) => s.loadResume)


  useEffect(() => {
    if (!resumeId) return

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`)
        if (!res.ok) {
          console.error("Failed to load resume", await res.text())
          return
        }

        const json = await res.json()
        const data = json.resume?.data

        if (!data) {
          console.error("Resume has no data")
          return
        }

        loadResume(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchResume()
  }, [resumeId, loadResume])



  return (
    <Layout className="min-h-screen bg-slate-100">

      <Layout.Content className="py-6">
        <div className="flex items-center gap-5">
              <SaveResumeButton />
            <LanguageSwitcher currentLocale={locale} />
</div>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row">
          
          <div className="w-full lg:w-[52%]">
            <EditorShell />
          </div>

          <div className="w-full lg:w-[48%] space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium text-slate-600">
                {dict.previewTitle}
              </span>
              <DownloadPdfButton locale={locale} />
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
