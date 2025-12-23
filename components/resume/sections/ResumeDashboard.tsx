"use client";

import { computeResumeScore } from "@/lib/resumeProgress";
import { useResumeStore } from "@/store/useResumeStore";
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
import { useMemo } from "react";

const { Text } = Typography;

type Status = "good" | "warn" | "bad";

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

function scoreLabel(percent: number) {
  if (percent >= 85) return { text: "Почти готово", status: "good" as const };
  if (percent >= 60) return { text: "Неплохо", status: "warn" as const };
  return { text: "Нужно заполнить", status: "bad" as const };
}

function sectionMeta(section: string) {
  switch (section) {
    case "basic":
      return { icon: User, label: "Шапка" };
    case "summary":
      return { icon: FileText, label: "О себе" };
    case "experience":
      return { icon: Briefcase, label: "Опыт" };
    case "skills":
      return { icon: Wrench, label: "Навыки" };
    case "education":
      return { icon: GraduationCap, label: "Образование" };
    case "languages":
      return { icon: Languages, label: "Языки" };
    case "preferences":
      return { icon: Settings2, label: "Предпочтения" };
    case "certifications":
      return { icon: BadgeCheck, label: "Сертификаты" };
    case "activities":
      return { icon: HeartHandshake, label: "Активности" };
    default:
      return { icon: Sparkles, label: "Раздел" };
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
      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${s.chip}`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        <span className="text-[12px] font-semibold">{label}</span>
      </div>
      <span className="text-[12px] font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export function ResumeDashboard({
  onNavigate,
}: {
  onNavigate?: (section: string) => void;
}) {
  const resume = useResumeStore((s) => s.resume);
  const data = useMemo(() => computeResumeScore(resume), [resume]);

  const badge = scoreLabel(data.percent);
  const badgeStyles = statusStyles(badge.status);

  const HintIcon = data.percent >= 85 ? CheckCircle2 : AlertTriangle;
  const hintStatus: Status = data.percent >= 85 ? "good" : "warn";
  const hintStyles = statusStyles(hintStatus);

  return (
    <Card
      className="!rounded-[20px] !border !border-border !bg-surface"
      styles={{ body: { padding: 16 } }}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-border bg-surface2">
                <Sparkles className="h-4 w-4 text-text2" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Text strong className="!m-0 !text-text">
                    Дашборд резюме
                  </Text>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold ${badgeStyles.chip}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${badgeStyles.dot}`}
                    />
                    {badge.text}
                  </span>
                </div>

                <div className="mt-0.5 text-[12px] text-text3">
                  {data.gained}/{data.total} баллов · чем ближе к 100%, тем
                  сильнее резюме
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[28px] font-bold leading-none tabular-nums text-text">
              {data.percent}%
            </div>
            <div className="mt-0.5 text-[12px] text-text3">готовность</div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface2 px-4 py-3">
          <Progress
            percent={data.percent}
            showInfo={false}
            size="small"
            style={{ margin: 0 }}
          />
          <div className="mt-2 flex items-center justify-between text-[12px] text-text3">
            <span>Минимум для отправки: ~60%</span>
            <span>Сильно: 85%+</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {data.metrics.map((m) => (
            <MiniStat
              key={m.key}
              label={m.label}
              value={m.value}
              status={m.status}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface px-4 py-4">
          {data.nextHint ? (
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface2">
                  <HintIcon className={`h-5 w-5 ${hintStyles.icon}`} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {(() => {
                      const meta = sectionMeta(data.nextHint.section);
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
                <div className="shrink-0">
                  <Button
                    type="primary"
                    className="!rounded-full"
                    onClick={() => onNavigate(data.nextHint!.section)}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Исправить
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-success/25 bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>

              <div>
                <div className="text-[13px] font-semibold text-text">
                  Отлично! Всё выглядит заполненным
                </div>
                <div className="text-[12px] text-text2">
                  Можешь проверить форматирование и экспортировать в PDF.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
