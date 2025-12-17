"use client"

import React, { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button, Dropdown, type MenuProps } from "antd"
import { GlobalOutlined } from "@ant-design/icons"

type Locale = "ru" | "en"

export function LanguageSwitcher({ currentLocale }: { currentLocale?: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const locale: Locale = useMemo(() => {
    if (currentLocale) return currentLocale
    const seg = pathname?.split("/")[1]
    return seg === "en" ? "en" : "ru"
  }, [currentLocale, pathname])

  const handleChange = (nextLocale: Locale) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = nextLocale
    const nextPath = segments.join("/") || "/"
    router.push(nextPath)
  }

  const items: MenuProps["items"] = [
    {
      key: "ru",
      label: "Русский",
      icon: <span style={{ fontSize: 16, lineHeight: 1 }}>🇷🇺</span>,
      onClick: () => handleChange("ru"),
    },
    {
      key: "en",
      label: "English",
      icon: <span style={{ fontSize: 16, lineHeight: 1 }}>🇺🇸</span>,
      onClick: () => handleChange("en"),
    },
  ]

  return (
    <Dropdown menu={{ items, selectable: true, selectedKeys: [locale] }} trigger={["click"]}>
      <Button
        size="small"
        icon={<GlobalOutlined />}
        style={{ borderRadius: 10, fontWeight: 600 }}
      >
        {locale.toUpperCase()}
      </Button>
    </Dropdown>
  )
}
