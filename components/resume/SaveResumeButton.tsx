"use client"

import { useState } from "react"
import { Button } from "antd"
import { SaveOutlined, LoadingOutlined } from "@ant-design/icons"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useResumeStore } from "@/store/useResumeStore"
import type { Locale } from "@/lib/useCurrentLocale"

export function SaveResumeButton() {
  const { data: session } = useSession()
  const { resume } = useResumeStore()
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams() as { locale: Locale }
  const locale: Locale = params?.locale === "en" ? "en" : "ru"

  const existingId = searchParams.get("resumeId")

  const handleClick = async () => {
    if (!session?.user?.email) {
      console.warn("No user email in session, user is not authenticated")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session.user.email,
        }),
      })

      if (!res.ok) {
        console.error("Failed to save resume", await res.text())
        return
      }

      const json = await res.json()
      const newId: string = json.id

      if (newId && newId !== existingId) {
        const usp = new URLSearchParams(searchParams.toString())
        usp.set("resumeId", newId)
        router.replace(`/${locale}/editor?${usp.toString()}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const label =
    locale === "ru"
      ? existingId
        ? "Сохранить как новое"
        : "Сохранить резюме"
      : existingId
        ? "Save as new"
        : "Save resume"

  return (
    <Button
      type="primary"
      onClick={handleClick}
      disabled={!session?.user?.email}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
    >
      {label}
    </Button>
  )
}
