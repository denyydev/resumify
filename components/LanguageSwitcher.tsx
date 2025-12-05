"use client"

import { Segmented } from "antd"
import { usePathname, useRouter } from "next/navigation"

type Locale = "ru" | "en"

const options = [
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
]

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (nextLocale: string | number) => {
    if (!pathname || typeof nextLocale !== "string") return
    const segments = pathname.split("/") 
    segments[1] = nextLocale
    const nextPath = segments.join("/") || "/"
    router.push(nextPath)
  }

  return (
    <Segmented
      size="small"
      options={options}
      value={currentLocale}
      onChange={handleChange}
      className="bg-slate-100"
    />
  )
}
