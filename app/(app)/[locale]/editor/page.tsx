"use client";

import { useEffect, useCallback } from "react";
import { useParams, useSearchParams, usePathname, useRouter } from "next/navigation";
import { Grid, Button, Flex, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { EditorShell } from "@/components/resume/sections/EditorShell";
import { SaveResumeButton } from "@/components/resume/SaveResumeButton";
import { ResumeDashboard } from "@/components/resume/sections/ResumeDashboard";
import { ResetResumeButton } from "@/components/resume/ResetButton";

const { useBreakpoint } = Grid;

const messages = {
  ru: {
    openPreview: "Предпросмотр",
  },
  en: {
    openPreview: "Preview",
  },
} as const;

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const resumeId = searchParams.get("resumeId") || undefined;

  const loadResume = useResumeStore((s) => s.loadResume);

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes?id=${resumeId}`);
        if (!res.ok) return;
        const json = await res.json();
        const data = json.resume?.data;
        if (!data) return;
        loadResume(data);
      } catch {
        return;
      }
    };

    fetchResume();
  }, [resumeId, loadResume]);

  const handleOpenPreview = useCallback(() => {
    const basePath = pathname.endsWith("/preview")
      ? pathname.replace(/\/preview$/, "")
      : pathname;

    const queryString = searchParams.toString();
    const suffix = queryString ? `?${queryString}` : "";
    router.push(`${basePath}/preview${suffix}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-28">
      <div className="p-5 flex flex-col gap-5">
        <ResumeDashboard />
        <EditorShell />
      </div>

      <div
        className="fixed left-0 right-0 bottom-0 z-50 shadow-lg bg-white/90 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
<div className="flex py-2 justify-between max-w-[1440px] mx-auto">
                <Button type="text" onClick={handleOpenPreview} icon={<EyeOutlined />}>
                {dict.openPreview}
              </Button>
<div>
                <SaveResumeButton />
              <Divider orientation="vertical"/>
              <ResetResumeButton  />
</div>
</div>
      </div>
    </div>
  );
}
