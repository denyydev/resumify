import { NextRequest, NextResponse } from "next/server";
import playwright from "playwright";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { id = "demo", locale = "ru" } = await req.json();

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

    if (!origin) {
      return NextResponse.json(
        { error: "Missing origin (set NEXT_PUBLIC_APP_URL)" },
        { status: 500 }
      );
    }

    const url = `${origin}/${locale}/print/${id}`;

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 794, height: 1123 },
    });

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${id}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
