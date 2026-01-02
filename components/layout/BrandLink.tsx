"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { FileText } from "lucide-react";
import Link from "next/link";

export function BrandLink({ href }: { href: string }) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <Link href={href} className="group flex select-none items-center gap-2.5">
      <div
        className={`relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg border shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md ${
          isDark
            ? "border-slate-400/20 bg-[#0A84FF]"
            : "border-slate-950/12 bg-[#020617]"
        }`}
      >
        <div
          className={`pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full blur-xl opacity-70 transition-opacity group-hover:opacity-90 ${
            isDark ? "bg-white/30" : "bg-[#0A84FF]/30"
          }`}
        />
        <FileText className="relative h-4 w-4 text-white" />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`text-base font-semibold tracking-tight transition-colors ${
            isDark ? "text-white" : "text-[#020617]"
          }`}
        >
          ResumeCraft
        </span>
        <span
          className={`mt-0.5 text-[11px] tracking-wide transition-colors ${
            isDark ? "text-white/60" : "text-slate-500"
          }`}
        >
          Simple builder
        </span>
      </div>
    </Link>
  );
}

