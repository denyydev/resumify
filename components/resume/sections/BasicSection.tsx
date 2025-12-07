"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Button,
  Col,
  Input,
  Row,
  Space,
  Typography,
  Upload,
  UploadProps,
} from "antd"
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons"

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
    photo: "Фото",
    photoSubtitle: "Опционально, но повышает доверие.",
    removePhoto: "Удалить фото",
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
    photo: "Photo",
    photoSubtitle: "Optional, but can increase trust.",
    removePhoto: "Remove photo",
  },
} as const

export function BasicSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]

  const {
    resume,
    setFullName,
    setPosition,
    setContacts,
    setSummary,
    setPhoto,
    reset,
  } = useResumeStore()

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          setPhoto(result) // data:image/...;base64,...
        }
      }
      reader.readAsDataURL(file)

      // отменяем реальный аплоад (мы всё храним в Zustand)
      return false
    },
    showUploadList: false,
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="space-y-6">
      {/* Заголовок секции */}
      <Space orientation="vertical" size={4} className="w-full">
        <Text className="text-sm font-semibold text-slate-900">
          {t.sectionTitle}
        </Text>
        <Text type="secondary" className="text-xs">
          {t.sectionSubtitle}
        </Text>
      </Space>

      <Space orientation="vertical" size={16} className="w-full">
        {/* Блок: фото + ФИО + позиция */}
        <Row gutter={[16, 16]} align="top">
          {/* Фото */}
          <Col xs={24} md={6}>
            <Space orientation="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                {t.photo}
              </Text>
              <Text type="secondary" className="text-[11px]">
                {t.photoSubtitle}
              </Text>

              <div className="flex items-center gap-3">
                <Upload {...uploadProps}>
                  <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border border-dashed border-slate-300 cursor-pointer overflow-hidden">
                    {resume.photo ? (
                      <img
                        src={resume.photo}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-slate-400 text-[11px]">
                        <CameraOutlined />
                        <span>
                          JPG / PNG
                        </span>
                      </div>
                    )}
                  </div>
                </Upload>

                {resume.photo && (
                  <Button
                    size="small"
                    type="text"
                    icon={<DeleteOutlined />}
                    className="text-[11px]"
                    onClick={() => setPhoto(undefined)}
                  >
                    {t.removePhoto}
                  </Button>
                )}
              </div>
            </Space>
          </Col>

          {/* ФИО + позиция */}
          <Col xs={24} md={18}>
            <Space orientation="vertical" size={12} className="w-full">
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
            </Space>
          </Col>
        </Row>

        {/* Контакты */}
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

        {/* Summary */}
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
          onClick={handleReset}
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
