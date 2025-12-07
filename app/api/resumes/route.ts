import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const runtime = "nodejs";

// СОХРАНЕНИЕ РЕЗЮМЕ
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    // у тебя в auth.ts в session callback email есть,
    // раз гугл-логин и /api/auth/session работают
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { data, locale, title } = body;

    const resume = await prisma.resume.create({
      data: {
        userEmail: session.user.email, // 👈 ключевое
        locale: locale ?? "ru",
        title: title ?? data?.position ?? "",
        data,
      },
    });

    return NextResponse.json({ id: resume.id });
  } catch (e) {
    console.error("POST /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}

// СПИСОК РЕЗЮМЕ — фильтр по userEmail (без auth() в GET)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userEmail }, // 👈 вот тут раньше падало
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ resumes });
  } catch (e) {
    console.error("GET /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to load resumes" },
      { status: 500 }
    );
  }
}
