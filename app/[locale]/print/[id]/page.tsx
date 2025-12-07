// app/[locale]/print/[id]/page.tsx
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ResumePrint } from "@/components/resume/ResumePrint"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface PrintPageProps {
  // ВАЖНО: params — Promise, а не просто объект
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function PrintPage(props: PrintPageProps) {
  // Правильно разворачиваем params
  const { locale, id } = await props.params

  console.log("PrintPage params resolved:", { locale, id })

  if (!id) {
    console.warn("PrintPage: no id in params")
    notFound()
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { id },
    })

    if (!resume) {
      console.warn("PrintPage: resume not found", { id })
      notFound()
    }

    return (
      <ResumePrint
        data={resume.data as any}
        locale={locale}
      />
    )
  } catch (error) {
    console.error("PrintPage error:", error)
    throw error
  }
}
