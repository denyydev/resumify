import { Card, Space } from "antd";
import type { Locale } from "@/content/recommendations/types";
import { messages } from "@/content/recommendations/messages";

export function RuleRow({
  title,
  good,
  risky,
  fix,
  example,
  locale,
}: {
  title: string;
  good: string;
  risky: string;
  fix: string;
  example: string;
  locale: Locale;
}) {
  const t = messages[locale];
  return (
    <Card size="small">
      <div className="text-sm font-semibold text-[var(--ant-colorText)] mb-3">
        {title}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[rgba(16,185,129,0.35)] bg-[rgba(16,185,129,0.10)] p-3">
          <div className="text-xs font-semibold text-[rgba(16,185,129,0.95)] mb-1">
            {t.micro.good}
          </div>
          <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
            {good}
          </div>
        </div>

        <div className="rounded-lg border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.10)] p-3">
          <div className="text-xs font-semibold text-[rgba(245,158,11,0.95)] mb-1">
            {t.micro.risky}
          </div>
          <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
            {risky}
          </div>
        </div>

        <div className="rounded-lg border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillQuaternary)] p-3">
          <div className="text-xs font-semibold text-[var(--ant-colorText)] mb-1">
            {t.micro.fix}
          </div>
          <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
            {fix}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[var(--ant-colorBorder)] bg-[var(--ant-colorBgContainer)] p-3">
        <div className="text-xs font-semibold text-[var(--ant-colorText)] mb-1">
          {t.micro.example}
        </div>
        <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
          {example}
        </div>
      </div>
    </Card>
  );
}

