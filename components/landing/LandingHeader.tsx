"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/app/i18n";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type Props = {
  locale: Locale;
};

export function LandingHeader({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale: Locale = locale === "ru" ? "en" : "ru";
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments[0] === "ru" || segments[0] === "en") {
        segments[0] = newLocale;
        router.push(`/${segments.join("/")}`);
      } else {
        router.push(`/${newLocale}`);
      }
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <button
          onClick={handleLocaleChange}
          className="flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900"
          aria-label="Toggle language"
        >
          {locale === "ru" ? "EN" : "RU"}
        </button>

        <a
          href="https://github.com/denyydev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-white/80 hover:text-slate-900"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}
