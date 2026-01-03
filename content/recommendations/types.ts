import type { ReactNode } from "react";

export type Locale = "ru" | "en";

export type SectionKey = "overview" | "faq" | "checklist";

export type FaqItem = {
  key: string;
  icon: ReactNode;
  title: string;
  content: ReactNode;
  tags?: string[];
};

export type Rule = {
  title: string;
  good: string;
  risky: string;
  fix: string;
  example: string;
};

export type Tool = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export type Pattern = {
  summary: string[];
  bullets: string[];
  skills: string;
};

