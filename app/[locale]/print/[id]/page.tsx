"use client"

import { useParams } from "next/navigation"
import { ResumePreview } from "@/components/resume/ResumePreview"


export default function PrintResumePage() {
  const params = useParams<{ id: string; locale: string }>()

  return (
    <html lang={params.locale}>
      <body className="bg-white">
        <div className="mx-auto my-4 flex min-h-[297mm] w-[210mm] justify-center">
          <div className="w-full px-8 py-8">
            <ResumePreview />
          </div>
        </div>
      </body>
    </html>
  )
}
