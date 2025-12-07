// app/api/resumes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ParamsPromise = Promise<{ id: string }>;

export async function GET(req: NextRequest, props: { params: ParamsPromise }) {
  try {
    // 🔑 ВАЖНО: params нужно await-нуть
    const { id } = await props.params;

    console.log("GET /api/resumes/[id] ->", id);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id }, // тут уже не undefined
    });

    if (!resume) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (e) {
    console.error("GET /api/resumes/[id] error:", e);
    return NextResponse.json(
      { error: "Failed to load resume" },
      { status: 500 }
    );
  }
}
