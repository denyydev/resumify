"use client"

import { useState } from "react"
import { Button, Tooltip } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { type Locale } from "@/lib/useCurrentLocale"
import { useResumeStore } from "@/store/useResumeStore"

type Props = {
  locale: Locale
}

export function DownloadPdfButton({ locale }: Props) {
  const [loading, setLoading] = useState(false)
  const resume = useResumeStore((s) => s.resume)

  const handleClick = async () => {
    try {
      setLoading(true)

      // 1) СНАЧАЛА — СОХРАНИТЬ РЕЗЮМЕ В БД
      const saveRes = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: resume }),
      })

      if (!saveRes.ok) {
        console.error("Failed to save resume", await saveRes.text())
        return
      }

      const { id } = (await saveRes.json()) as { id: string }
      console.log("Saved resume id:", id)

      // 2) ПОТОМ — СГЕНЕРИТЬ PDF ПО ЭТОМУ id
      const pdfRes = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, locale }),
      })

      if (!pdfRes.ok) {
        console.error("Failed to generate PDF", await pdfRes.text())
        return
      }

      const blob = await pdfRes.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `resume-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const labelByLocale: Record<Locale, string> = {
    ru: "Скачать PDF",
    en: "Download PDF",
  }

  const tooltipByLocale: Record<Locale, string> = {
    ru: "Сохранить и скачать резюме в PDF",
    en: "Save and download resume as PDF",
  }

  return (
    <Tooltip title={tooltipByLocale[locale]}>
      <Button
        type="primary"
        size="small"
        icon={<DownloadOutlined />}
        loading={loading}
        onClick={handleClick}
      >
        {labelByLocale[locale]}
      </Button>
    </Tooltip>
  )
}
