"use client"

import { useState } from "react"
import { Button, Tooltip } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { type Locale } from "@/lib/useCurrentLocale"

type Props = {
  resumeId?: string
  locale: Locale
}

export function DownloadPdfButton({ resumeId, locale }: Props) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!resumeId) return

    try {
      setLoading(true)

      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resumeId, locale }),
      })

      if (!res.ok) {
        console.error("Failed to generate PDF")
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `resume-${resumeId}.pdf`
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
    ru: "Сгенерировать резюме в формате PDF",
    en: "Generate resume as PDF",
  }

  return (
    <Tooltip title={tooltipByLocale[locale]}>
      <Button
        type="primary"
        size="small"
        icon={<DownloadOutlined />}
        loading={loading}
        disabled={!resumeId}
        onClick={handleClick}
      >
        {labelByLocale[locale]}
      </Button>
    </Tooltip>
  )
}
