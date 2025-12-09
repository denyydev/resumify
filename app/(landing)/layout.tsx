import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "antd/dist/reset.css"
import "../globals.css"
import { SessionProvider } from "@/components/SessionProvider"



const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})



export const metadata: Metadata = {
  title: "ResumeCraft - Modern Resume Builder",
  description: "Create beautiful, professional resumes that get you hired faster",
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = params?.locale ?? "ru"
  
  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-slate-50 antialiased">
        <SessionProvider>

          <main className="min-h-screen">
            {children}
          </main>


        </SessionProvider>
      </body>
    </html>
  )
}