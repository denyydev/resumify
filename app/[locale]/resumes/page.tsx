"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

type ResumeListItem = {
  id: string
  data: any
  createdAt: string
  updatedAt: string
}

const messages = {
  ru: {
    title: "Мои резюме",
    subtitle: "Здесь хранятся все ваши сохранённые резюме.",
    empty: "У вас пока нет сохранённых резюме.",
    fullName: "Имя",
    position: "Позиция",
    createdAt: "Создано",
    updatedAt: "Обновлено",
    openEditor: "Открыть в редакторе",
    openPdf: "Открыть PDF",
    unauthorized: "Чтобы увидеть свои резюме, войдите в аккаунт.",
    goHome: "На главную",
  },
  en: {
    title: "My resumes",
    subtitle: "Here you can find all your saved resumes.",
    empty: "You don't have any saved resumes yet.",
    fullName: "Name",
    position: "Position",
    createdAt: "Created at",
    updatedAt: "Updated at",
    openEditor: "Open in editor",
    openPdf: "Open PDF",
    unauthorized: "You need to sign in to see your resumes.",
    goHome: "Go to homepage",
  },
} as const

export default function MyResumesPage() {
  const params = useParams() as { locale: "ru" | "en" }
  const locale = params.locale ?? "en"
  const t = messages[locale] ?? messages.en
  const router = useRouter()

  const { data: session, status } = useSession()

  const [resumes, setResumes] = useState<ResumeListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated" || !session?.user?.email) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/resumes?userEmail=${encodeURIComponent(
            session.user!.email as string,
          )}`,
        )

        if (!res.ok) {
          console.error("Failed to load resumes", await res.text())
          return
        }

        const json = await res.json()
        setResumes(json.resumes || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [status, session?.user])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-600">
        Loading...
      </div>
    )
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-700 mb-4">
            {t.unauthorized}
          </p>
          <button
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-800"
            onClick={() => router.push(`/${locale}`)}
          >
            {t.goHome}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            {t.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.subtitle}
          </p>
        </header>

        {resumes.length === 0 ? (
          <p className="text-sm text-slate-500">
            {t.empty}
          </p>
        ) : (
          <ul className="space-y-3">
            {resumes.map((resume) => {
              const data = resume.data || {}
              const fullName = data.fullName || "—"
              const position = data.position || "—"

              const createdAt = new Date(resume.createdAt).toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-US",
              )
              const updatedAt = new Date(resume.updatedAt).toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-US",
              )

              return (
                <li
                  key={resume.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {fullName}
                    </p>
                    <p className="text-xs text-slate-600 truncate">
                      {position}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-slate-500">
                      <span>
                        {t.createdAt}: {createdAt}
                      </span>
                      <span>
                        {t.updatedAt}: {updatedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-xs">
                    <Link
                      href={`/${locale}/editor?resumeId=${resume.id}`}
                      className="px-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 transition text-xs"
                    >
                      {t.openEditor}
                    </Link>
                    <Link
                      href={`/${locale}/print/${resume.id}`}
                      className="px-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700 transition text-xs"
                      target="_blank"
                    >
                      {t.openPdf}
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
