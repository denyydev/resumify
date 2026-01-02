import type { ReactNode } from "react"
import "antd/dist/reset.css"
import "./globals.css"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export const metadata = {
  title: "ResumeCraft",
  description: "Конструктор резюме с PDF-экспортом",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 dark:bg-slate-900 transition-colors">
        <SessionProvider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
