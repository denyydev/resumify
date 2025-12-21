import LandingPage from "@/components/landing/LandingPage"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/ru/editor")
  }

  return <LandingPage />
}
