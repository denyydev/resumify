import type { ReactNode } from "react"
import "antd/dist/reset.css"
import "./globals.css"

export const metadata = {
  title: "Focused Resume",
  description: "Конструктор резюме с PDF-экспортом",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">{children}</body>
    </html>
  )
}