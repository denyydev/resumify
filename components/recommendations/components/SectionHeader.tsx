import { Space, Typography } from "antd";
import type { ReactNode } from "react";

const { Title } = Typography;

export function SectionHeader({
  icon,
  title,
  level = 3,
}: {
  icon: ReactNode;
  title: string;
  level?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <Space size={12} align="center">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillTertiary)]">
        {icon}
      </span>
      <Title level={level} style={{ margin: 0 }}>
        {title}
      </Title>
    </Space>
  );
}

