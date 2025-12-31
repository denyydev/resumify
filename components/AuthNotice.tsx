"use client";

import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  locale: "ru" | "en";
};

export function AuthNotice({ locale }: Props) {
  const { data: session, status } = useSession();
  const [closed, setClosed] = useState(false);

  if (status === "loading") return null;
  if (session?.user || closed) return null;

  const t = {
    ru: {
      title: "Откройте полный доступ",
      description:
        "Авторизуйтесь, чтобы сохранять резюме, скачивать PDF и управлять документами.",
      action: "Войти",
    },
    en: {
      title: "Get full access",
      description:
        "Sign in to save resumes, download PDFs, and manage your documents.",
      action: "Sign in",
    },
  }[locale];

  return (
    <div className="border-b border-slate-900/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-violet-600 dark:text-violet-300">
            <Info size={18} />
          </div>

          <div className="text-sm">
            <div className="font-semibold text-slate-900 dark:text-white">
              {t.title}
            </div>
            <div className="text-slate-600 dark:text-white/60">
              {t.description}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setClosed(true)}
            className="rounded-full px-2 py-1 text-xs text-slate-500 hover:text-slate-900
                       dark:text-white/40 dark:hover:text-white/70 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
