"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";
import { useEffect, useMemo, useRef, useState } from "react";

const A4_W = 794;
const A4_H = 1123;
const CONTAINER_H = 180;
const PADDING = 12;
const DEFAULT_SCALE = 0.18;

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setWidth(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

type Props = {
  data: Resume;
  locale: Locale;
  className?: string;
};

export function ResumePreviewThumb({ data, locale, className }: Props) {
  const { ref, width } = useElementSize<HTMLDivElement>();

  const scale = useMemo(() => {
    const inner = Math.max(0, width - PADDING * 2);
    return inner > 0 ? inner / A4_W : DEFAULT_SCALE;
  }, [width]);

  return (
    <div
      ref={ref}
      className={
        "relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm " +
        (className ?? "")
      }
      style={{ height: CONTAINER_H }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent" />

      <div
        className="absolute pointer-events-none origin-top-left"
        style={{
          left: PADDING,
          top: PADDING,
          width: A4_W,
          height: A4_H,
          transform: `scale(${scale})`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 18px 40px rgba(15, 23, 42, 0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
          background: "#fff",
        }}
      >
        <ResumePrint data={data} locale={locale} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/5 to-transparent" />
    </div>
  );
}
