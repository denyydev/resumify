"use client";

import { Alert, Card, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import { BadgeCheck, BookOpen, FileText, Sparkles } from "lucide-react";
import type { Locale, SectionKey } from "@/content/recommendations/types";
import { messages } from "@/content/recommendations/messages";

export function SidebarNav({
  locale,
  activeSection,
  onSectionChange,
}: {
  locale: Locale;
  activeSection: SectionKey;
  onSectionChange: (key: SectionKey) => void;
}) {
  const t = messages[locale];

  const navItems: MenuProps["items"] = [
    {
      key: "overview",
      label: t.nav.overview,
      icon: <Sparkles size={16} />,
    },
    { key: "faq", label: t.nav.faq, icon: <BookOpen size={16} /> },
    {
      key: "checklist",
      label: t.nav.checklist,
      icon: <BadgeCheck size={16} />,
    },
  ];

  const onMenuClick: MenuProps["onClick"] = (e) => {
    onSectionChange(e.key as SectionKey);
  };

  return (
    <Card>
      <Space align="start" size={12} className="mb-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillTertiary)]">
          <FileText size={18} />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--ant-colorText)]">
            {t.pageTitle}
          </div>
          <div className="mt-1 text-xs leading-relaxed text-[var(--ant-colorTextSecondary)]">
            {t.intro}
          </div>
        </div>
      </Space>

      <div className="mb-4">
        <Menu
          mode="inline"
          selectedKeys={[activeSection]}
          items={navItems}
          onClick={onMenuClick}
        />
      </div>

      <Alert type="info" showIcon message={t.disclaimer} size="small" />
    </Card>
  );
}

