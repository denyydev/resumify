"use client";

import { Alert, Card, List, Space } from "antd";
import {
  BadgeCheck,
  ShieldCheck,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import type { Locale } from "@/content/recommendations/types";
import { messages } from "@/content/recommendations/messages";
import { SectionHeader } from "./components/SectionHeader";

export function ChecklistSection({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const isRu = locale === "ru";

  return (
    <Card>
      <SectionHeader
        icon={<BadgeCheck size={16} />}
        title={t.checklistTitle}
        level={2}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <Card size="small">
          <List
            size="small"
            dataSource={[...t.checklist]}
            renderItem={(x) => (
              <List.Item>
                <Space size={10}>
                  <BadgeCheck size={16} className="text-[var(--ant-colorSuccess)]" />
                  <span className="text-sm">{x}</span>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Space direction="vertical" size={12} className="w-full">
          <Alert
            type="warning"
            showIcon
            icon={<TriangleAlert size={16} />}
            message={isRu ? "Перед отправкой" : "Before sending"}
            description={
              isRu
                ? "Открой PDF и попробуй: выделить текст, скопировать, кликнуть ссылки, открыть на телефоне."
                : "Open the PDF and try: select text, copy, click links, open on mobile."
            }
          />

          <Alert
            type="info"
            showIcon
            icon={<ShieldCheck size={16} />}
            message={isRu ? "ATS-сейф" : "ATS-safe"}
            description={
              isRu
                ? "Если сомневаешься — отправляй ATS-friendly версию."
                : "When in doubt — submit the ATS-friendly version."
            }
          />

          <Alert
            type="success"
            showIcon
            icon={<Wand2 size={16} />}
            message={isRu ? "Быстрый апгрейд" : "Quick upgrade"}
            description={
              isRu
                ? "Добавь 2–3 метрики в опыт и перепиши 3 буллета по XYZ — это часто даёт самый большой прирост."
                : "Add 2–3 metrics and rewrite 3 bullets using XYZ — biggest ROI in minutes."
            }
          />
        </Space>
      </div>
    </Card>
  );
}

