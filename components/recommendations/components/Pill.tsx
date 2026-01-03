import { Card, Space } from "antd";
import type { ReactNode } from "react";

export function Pill({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card size="small" styles={{ body: { padding: 16 } }}>
      <Space align="start" size={12}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillTertiary)]">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--ant-colorText)]">
            {title}
          </div>
          <div className="mt-1 text-xs leading-relaxed text-[var(--ant-colorTextSecondary)]">
            {desc}
          </div>
        </div>
      </Space>
    </Card>
  );
}

