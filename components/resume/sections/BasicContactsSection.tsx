"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Divider, Flex, Form, Input, Space, Typography } from "antd";
import {
  Github,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useMemo } from "react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    sectionTitle: "Контакты и заголовок",
    sectionSubtitle:
      "Должность, контакты и короткое summary — это первое, что читают рекрутеры.",
    maxLenError: "Максимум 30 символов",

    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Телефон",
    phonePlaceholder: "+7 ...",
    city: "Город",
    cityPlaceholder: "Москва / Санкт-Петербург / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
  },
  en: {
    sectionTitle: "Contacts & header",
    sectionSubtitle:
      "Title, contacts and a short summary are the first things recruiters read.",
    maxLenError: "Max 30 characters",

    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone",
    phonePlaceholder: "+1 ...",
    city: "City",
    cityPlaceholder: "Berlin / Amsterdam / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

const MAX_LEN = 30;

export function BasicContactsSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const contacts = useResumeStore((s) => s.resume.contacts);
  const setContacts = useResumeStore((s) => s.setContacts);

  const maxLenRule = useMemo(
    () => ({
      validator(_: unknown, value: string) {
        if (!value) return Promise.resolve();
        if (value.length <= MAX_LEN) return Promise.resolve();
        return Promise.reject(new Error(t.maxLenError));
      },
    }),
    [t.maxLenError]
  );

  const contactItems = useMemo(
    () => [
      {
        key: "email",
        label: t.email,
        placeholder: t.emailPlaceholder,
        value: contacts.email,
        icon: <Mail size={16} />,
        onChange: (v: string) => setContacts({ email: v.slice(0, MAX_LEN) }),
      },
      {
        key: "phone",
        label: t.phone,
        placeholder: t.phonePlaceholder,
        value: contacts.phone,
        icon: <Phone size={16} />,
        onChange: (v: string) => setContacts({ phone: v.slice(0, MAX_LEN) }),
      },
      {
        key: "location",
        label: t.city,
        placeholder: t.cityPlaceholder,
        value: contacts.location,
        icon: <MapPin size={16} />,
        onChange: (v: string) => setContacts({ location: v.slice(0, MAX_LEN) }),
      },
      {
        key: "telegram",
        label: t.telegram,
        placeholder: t.telegramPlaceholder,
        value: contacts.telegram ?? "",
        icon: <Send size={16} />,
        onChange: (v: string) => setContacts({ telegram: v.slice(0, MAX_LEN) }),
      },
      {
        key: "github",
        label: t.github,
        placeholder: t.githubPlaceholder,
        value: contacts.github ?? "",
        icon: <Github size={16} />,
        onChange: (v: string) => setContacts({ github: v.slice(0, MAX_LEN) }),
      },
      {
        key: "linkedin",
        label: t.linkedin,
        placeholder: t.linkedinPlaceholder,
        value: contacts.linkedin ?? "",
        icon: <Linkedin size={16} />,
        onChange: (v: string) => setContacts({ linkedin: v.slice(0, MAX_LEN) }),
      },
    ],
    [contacts, setContacts, t]
  );

  return (
    <section id="contacts" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <Flex align="center" gap={10} wrap>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <LinkIcon size={18} />
            </span>
            <Title level={4} className="!m-0">
              {t.sectionTitle}
            </Title>
          </Flex>

          <Text type="secondary" className="text-sm">
            {t.sectionSubtitle}
          </Text>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        <Space orientation="vertical" size={12} className="w-full">
          <Form
            layout="vertical"
            colon={false}
            className="grid grid-cols-1 gap-4"
          >
            {contactItems.map((f) => (
              <Form.Item
                key={f.key}
                label={f.label}
                className="mb-0"
                rules={[maxLenRule]}
              >
                <Input
                  prefix={f.icon}
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  allowClear
                  maxLength={MAX_LEN}
                  showCount
                />
              </Form.Item>
            ))}
          </Form>
        </Space>
      </div>
    </section>
  );
}
