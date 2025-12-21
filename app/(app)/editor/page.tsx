import { redirect } from "next/navigation"
import { auth } from "@/auth"
import EditorClient from "./EditorClient"

export default async function Page({ params }: { params: { locale: "ru" | "en" } }) {
  const session = await auth()

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${params.locale}/editor`)
  }

  return <EditorClient locale={params.locale} />
}
