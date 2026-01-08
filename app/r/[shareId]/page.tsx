import { ShareDownloadButton } from "@/components/resume/nav/ShareDownloadButton";
import { ResumePrint } from "@/components/resume/ResumePrint";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeData } from "@/types/resume";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SharePageProps {
  params: Promise<{
    shareId: string;
  }>;
}

function normalizeLocale(value: string): Locale {
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

const messages = {
  ru: {
    downloadPdf: "Скачать PDF",
    resumeFallback: "Резюме",
    publicBadge: "Публичная ссылка",
    hint: "Это резюме открыто по ссылке. Вы можете скачать PDF.",
  },
  en: {
    downloadPdf: "Download PDF",
    resumeFallback: "Resume",
    publicBadge: "Public link",
    hint: "This resume is shared via a public link. You can download a PDF.",
  },
} as const;

export default async function SharePage(props: SharePageProps) {
  const { shareId } = await props.params;

  if (!shareId) notFound();

  const resume = await prisma.resume.findFirst({
    where: {
      shareId,
      isShared: true,
    },
    select: {
      id: true,
      locale: true,
      title: true,
      data: true,
    },
  });

  if (!resume) notFound();

  const locale: Locale = normalizeLocale(resume.locale);
  const t = messages[locale];

  const data = resume.data as ResumeData;

  const fullName =
    [data.lastName, data.firstName, data.patronymic]
      .filter(Boolean)
      .join(" ") ||
    resume.title ||
    t.resumeFallback;

  const position = data.position || "";

  return (
    <div className="min-h-screen bg-[var(--ant-colorBgLayout)] py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/70">
                <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                {t.publicBadge}
              </div>

              <h1 className="truncate text-2xl font-semibold tracking-tight text-black">
                {fullName}
              </h1>

              {position ? (
                <p className="mt-1 truncate text-sm text-black/60">
                  {position}
                </p>
              ) : null}

              <p className="mt-3 text-sm text-black/60">{t.hint}</p>
            </div>

            <ShareDownloadButton
              shareId={shareId}
              locale={locale}
              fileName={`${fullName.replace(/\s+/g, "-")}.pdf`}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/5 bg-black/[0.02] px-5 py-3">
            <div className="text-sm font-medium text-black/70">{fullName}</div>
          </div>

          <div className="flex justify-center p-4 sm:p-6">
            <div className="w-full max-w-[794px]">
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
                <ResumePrint
                  data={data}
                  templateKey={data.templateKey}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
