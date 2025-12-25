"use client";

import { Button, Card, Progress, Typography } from "antd";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Languages,
  Settings2,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { computeResumeScore } from "@/lib/resumeProgress";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

const { Text } = Typography;

type Status = "good" | "warn" | "bad";

const messages = {
  ru: {
    dashboard: "Дашборд",
    almostReady: "Почти готово",
    notBad: "Неплохо",
    needFill: "Нужно заполнить",
    betterTo100: "· к 100% лучше",
    readiness: "готовность",
    minimum: "Минимум: ~60%",
    strong: "Сильно: 85%+",
    fix: "Исправить",
    allDoneTitle: "Отлично! Всё заполнено",
    allDoneDesc: "Проверь форматирование и экспортируй в PDF.",

    sections: {
      basic: "Шапка",
      summary: "О себе",
      experience: "Опыт",
      skills: "Навыки",
      education: "Образование",
      languages: "Языки",
      preferences: "Предпочтения",
      certifications: "Сертификаты",
      activities: "Активности",
      default: "Раздел",
    },
  },
  en: {
    dashboard: "Dashboard",
    almostReady: "Almost ready",
    notBad: "Not bad",
    needFill: "Needs work",
    betterTo100: "· closer to 100%",
    readiness: "readiness",
    minimum: "Minimum: ~60%",
    strong: "Strong: 85%+",
    fix: "Fix",
    allDoneTitle: "Great! Everything is filled",
    allDoneDesc: "Check formatting and export to PDF.",

    sections: {
      basic: "Header",
      summary: "Summary",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      preferences: "Preferences",
      certifications: "Certifications",
      activities: "Activities",
      default: "Section",
    },
  },
} as const;

function statusStyles(status: Status) {
  if (status === "good") {
    return {
      chip: "bg-success/10 text-success border-success/25",
      dot: "bg-success",
      icon: "text-success",
    };
  }
  if (status === "warn") {
    return {
      chip: "bg-warning/10 text-warning border-warning/25",
      dot: "bg-warning",
      icon: "text-warning",
    };
  }
  return {
    chip: "bg-danger/10 text-danger border-danger/25",
    dot: "bg-danger",
    icon: "text-danger",
  };
}

function scoreLabel(percent: number, dict: (typeof messages)["ru" | "en"]) {
  if (percent >= 85) return { text: dict.almostReady, status: "good" as const };
  if (percent >= 60) return { text: dict.notBad, status: "warn" as const };
  return { text: dict.needFill, status: "bad" as const };
}

function sectionMeta(section: string, dict: (typeof messages)["ru" | "en"]) {
  switch (section) {
    case "basic":
      return { icon: User, label: dict.sections.basic };
    case "summary":
      return { icon: FileText, label: dict.sections.summary };
    case "experience":
      return { icon: Briefcase, label: dict.sections.experience };
    case "skills":
      return { icon: Wrench, label: dict.sections.skills };
    case "education":
      return { icon: GraduationCap, label: dict.sections.education };
    case "languages":
      return { icon: Languages, label: dict.sections.languages };
    case "preferences":
      return { icon: Settings2, label: dict.sections.preferences };
    case "certifications":
      return { icon: BadgeCheck, label: dict.sections.certifications };
    case "activities":
      return { icon: HeartHandshake, label: dict.sections.activities };
    default:
      return { icon: Sparkles, label: dict.sections.default };
  }
}

function MiniStat({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: Status;
}) {
  const s = statusStyles(status);
  return (
    <div
      className={[
        "flex items-center justify-between gap-2 rounded-2xl border px-3 py-2",
        s.chip,
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className={["h-2 w-2 shrink-0 rounded-full", s.dot].join(" ")} />
        <span className="min-w-0 truncate text-[12px] font-semibold">
          {label}
        </span>
      </div>
      <span className="shrink-0 text-[12px] font-semibold tabular-nums">
        {value}
      </span>
    </div>
  );
}

export function ResumeDashboard({
  onNavigate,
}: {
  onNavigate?: (section: string) => void;
}) {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const resume = useResumeStore((s) => s.resume);
  const data = useMemo(
    () => computeResumeScore(resume, locale),
    [resume, locale]
  );

  const badge = scoreLabel(data.percent, dict);
  const badgeStyles = statusStyles(badge.status);

  const HintIcon = data.percent >= 85 ? CheckCircle2 : AlertTriangle;
  const hintStatus: Status = data.percent >= 85 ? "good" : "warn";
  const hintStyles = statusStyles(hintStatus);

  return (
    <Card
      size="small"
      bodyStyle={{ padding: 14 }}
      className="!rounded-[20px] !border !border-border !bg-surface"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface2">
                <Sparkles className="h-4 w-4 text-text2" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Text strong className="!m-0 !text-text">
                    {dict.dashboard}
                  </Text>

                  <span
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-2.5 py-1",
                      "text-[12px] font-semibold",
                      badgeStyles.chip,
                    ].join(" ")}
                  >
                    <span
                      className={["h-2 w-2 rounded-full", badgeStyles.dot].join(
                        " "
                      )}
                    />
                    {badge.text}
                  </span>
                </div>

                <div className="mt-0.5 text-[12px] text-text3">
                  {data.gained}/{data.total} {dict.betterTo100}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[26px] font-bold leading-none tabular-nums text-text">
              {data.percent}%
            </div>
            <div className="mt-0.5 text-[12px] text-text3">
              {dict.readiness}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface2 px-3 py-3">
          <Progress
            percent={data.percent}
            showInfo={false}
            size="small"
            className="m-0"
          />
          <div className="mt-2 flex flex-col gap-1 text-[12px] text-text3">
            <span>{dict.minimum}</span>
            <span>{dict.strong}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {data.metrics.map((m) => (
            <MiniStat
              key={m.key}
              label={m.label}
              value={m.value}
              status={m.status}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-surface px-3 py-3">
          {data.nextHint ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface2">
                  <HintIcon
                    className={["h-5 w-5", hintStyles.icon].join(" ")}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {(() => {
                      const meta = sectionMeta(data.nextHint.section, dict);
                      const Icon = meta.icon;
                      return (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-text2">
                          <Icon className="h-4 w-4" />
                          {meta.label}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="mt-1 text-[13px] font-semibold text-text">
                    {data.nextHint.title}
                  </div>
                  <div className="mt-1 whitespace-pre-line text-[12px] text-text2">
                    {data.nextHint.description}
                  </div>
                </div>
              </div>

              {onNavigate && (
                <Button
                  type="primary"
                  block
                  className="!rounded-full"
                  onClick={() => onNavigate(data.nextHint.section)}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {dict.fix}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-success/25 bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>

              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-text">
                  {dict.allDoneTitle}
                </div>
                <div className="mt-1 text-[12px] text-text2">
                  {dict.allDoneDesc}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
