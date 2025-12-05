"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { Button, Col, Input, Row, Space, Typography } from "antd"

const { TextArea } = Input
const { Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Основная информация",
    sectionSubtitle: "Эти данные попадут в шапку резюме.",
    fullName: "Полное имя",
    fullNamePlaceholder: "Иванов Иван Иванович",
    position: "Желаемая позиция",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Телефон",
    phonePlaceholder: "+7 ...",
    city: "Город",
    cityPlaceholder: "Москва / Санкт-Петербург / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "https://github.com/username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "https://linkedin.com/in/username",
    summary: "Краткое резюме",
    summaryPlaceholder:
      "2–4 предложения о твоём опыте, стеке и сильных сторонах.",
    reset: "Сбросить все поля",
    next: "Дальше к опыту",
  },
  en: {
    sectionTitle: "Basic information",
    sectionSubtitle: "This information will appear in the header of your resume.",
    fullName: "Full name",
    fullNamePlaceholder: "John Doe",
    position: "Desired position",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone",
    phonePlaceholder: "+1 ...",
    city: "City",
    cityPlaceholder: "Berlin / Amsterdam / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "https://github.com/username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "https://linkedin.com/in/username",
    summary: "Summary",
    summaryPlaceholder:
      "2–4 sentences about your experience, stack and strengths.",
    reset: "Reset all fields",
    next: "Next: Experience",
  },
} as const

export function BasicSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]

  const { resume, setFullName, setPosition, setContacts, setSummary, reset } =
    useResumeStore()

  return (
    <div className="space-y-6">
      <Space orientation="vertical" size={4} className="w-full">
        <Text className="text-sm font-semibold text-slate-900">
          {t.sectionTitle}
        </Text>
        <Text type="secondary" className="text-xs">
          {t.sectionSubtitle}
        </Text>
      </Space>

      <Space orientation="vertical" size={16} className="w-full">
        <Space orientation="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            {t.fullName}
          </Text>
          <Input
            size="middle"
            placeholder={t.fullNamePlaceholder}
            value={resume.fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Space>

        <Space orientation="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            {t.position}
          </Text>
          <Input
            size="middle"
            placeholder={t.positionPlaceholder}
            value={resume.position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.email}
              </Text>
              <Input
                size="middle"
                placeholder={t.emailPlaceholder}
                value={resume.contacts.email}
                onChange={(e) => setContacts({ email: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.phone}
              </Text>
              <Input
                size="middle"
                placeholder={t.phonePlaceholder}
                value={resume.contacts.phone}
                onChange={(e) => setContacts({ phone: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.city}
              </Text>
              <Input
                size="middle"
                placeholder={t.cityPlaceholder}
                value={resume.contacts.location}
                onChange={(e) => setContacts({ location: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.telegram}
              </Text>
              <Input
                size="middle"
                placeholder={t.telegramPlaceholder}
                value={resume.contacts.telegram ?? ""}
                onChange={(e) => setContacts({ telegram: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.github}
              </Text>
              <Input
                size="middle"
                placeholder={t.githubPlaceholder}
                value={resume.contacts.github ?? ""}
                onChange={(e) => setContacts({ github: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.linkedin}
              </Text>
              <Input
                size="middle"
                placeholder={t.linkedinPlaceholder}
                value={resume.contacts.linkedin ?? ""}
                onChange={(e) => setContacts({ linkedin: e.target.value })}
              />
            </Space>
          </Col>
        </Row>

        <Space orientation="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            {t.summary}
          </Text>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 8 }}
            placeholder={t.summaryPlaceholder}
            value={resume.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Space>
      </Space>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          className="text-xs text-slate-400 hover:text-slate-600"
          onClick={reset}
        >
          {t.reset}
        </button>
        <Button type="default" size="small">
          {t.next}
        </Button>
      </div>
    </div>
  )
}
