"use client"

import { useState } from "react"
import { Button, message } from "antd"
import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"

export function SaveResumeButton() {
  const [loading, setLoading] = useState(false)
  const { resume } = useResumeStore()
  const locale = useCurrentLocale()

  const handleSave = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          data: resume,
        }),
      })

      const text = await res.text()
      let json: any = null

      try {
        json = text ? JSON.parse(text) : null
      } catch {
        // HTML – значит упали до next/_error
      }

      if (!res.ok) {
        console.error("Save error:", text)
        const details = json?.message || json?.code || json?.error
        message.error(
          details
            ? `Не удалось сохранить: ${details}`
            : "Не удалось сохранить резюме (500)"
        )
        return
      }

      message.success("Резюме сохранено")
      console.log("Saved resume:", json)
    } catch (e) {
      console.error(e)
      message.error("Ошибка при сохранении")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="small" onClick={handleSave} loading={loading}>
      Сохранить
    </Button>
  )
}
