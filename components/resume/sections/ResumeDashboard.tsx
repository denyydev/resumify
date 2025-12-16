"use client"

import React, { useMemo } from "react"
import { Card, Typography, Progress, Space, Tag, Flex } from "antd"
import { ThunderboltOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useResumeStore } from "@/store/useResumeStore"
import { computeResumeScore } from "@/lib/resumeProgress"

const { Text } = Typography

function statusColor(status: "good" | "warn" | "bad") {
  if (status === "good") return "green"
  if (status === "warn") return "gold"
  return "red"
}

export function ResumeDashboard() {
  const resume = useResumeStore((s) => s.resume)

  const data = useMemo(() => computeResumeScore(resume), [resume])

  return (
    <Card
      size="small"
      styles={{ body: { padding: 14 } }}
      style={{ borderRadius: 16 }}
    >
      <Flex align="center" justify="space-between" gap={12} wrap>
        <Space size={10} align="center">
          <ThunderboltOutlined />
          <Text strong>Дашборд резюме</Text>
          <Tag color={data.percent >= 80 ? "green" : data.percent >= 50 ? "gold" : "red"}>
            {data.percent >= 80 ? "Почти готово" : data.percent >= 50 ? "Неплохо" : "Нужно заполнить"}
          </Tag>
        </Space>

        <Progress
          percent={data.percent}
          size="small"
          style={{ width: 220, margin: 0 }}
        />
      </Flex>

      <div style={{ marginTop: 10 }}>
        <Flex gap={8} wrap>
          {data.metrics.map((m) => (
            <Tag key={m.key} color={statusColor(m.status)} style={{ borderRadius: 999, paddingInline: 10 }}>
              <b style={{ marginRight: 6 }}>{m.label}:</b> {m.value}
            </Tag>
          ))}
        </Flex>
      </div>

      {data.nextHint && (
        <div style={{ marginTop: 10 }}>
          <Flex align="center" gap={8}>
            {data.percent >= 80 ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <ExclamationCircleOutlined style={{ color: "#faad14" }} />
            )}
            <div>
              <Text strong>{data.nextHint.title}</Text>
              <div>
                <Text type="secondary">{data.nextHint.description}</Text>
              </div>
            </div>
          </Flex>
        </div>
      )}
    </Card>
  )
}
