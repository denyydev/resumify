"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  CalendarOutlined,
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Form, Input, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2 } from "lucide-react";

const messages = {
  ru: {
    title: "Сертификации",
    subtitle: "Добавь сертификаты и курсы, которые важны для роли.",
    add: "Добавить сертификат",
    empty: "Пока нет сертификатов. Добавь первый — это повысит доверие.",
    name: "Название",
    namePh: "AWS Certified Developer – Associate",
    issuer: "Организация",
    issuerPh: "Amazon Web Services",
    year: "Год",
    yearPh: "2025",
    link: "Ссылка",
    linkPh: "https://...",
    remove: "Удалить",
  },
  en: {
    title: "Certifications",
    subtitle: "Add certifications and courses relevant to your role.",
    add: "Add certification",
    empty: "No certifications yet. Add your first one to boost credibility.",
    name: "Name",
    namePh: "AWS Certified Developer – Associate",
    issuer: "Issuer",
    issuerPh: "Amazon Web Services",
    year: "Year",
    yearPh: "2025",
    link: "Link",
    linkPh: "https://...",
    remove: "Remove",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function CertificationsSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const list = useResumeStore((s) => s.resume.certifications ?? []);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);

  return (
    <Card
      title={
        <Space>
          <BadgeCheck size={18} />
          <span>{t.title}</span>
        </Space>
      }
      extra={
        <Button
          size="small"
          type="primary"
          icon={<PlusOutlined />}
          onClick={addCertification}
        >
          {t.add}
        </Button>
      }
    >
      <div style={{ marginTop: -8, marginBottom: 12, opacity: 0.75 }}>
        {t.subtitle}
      </div>

      <AnimatePresence initial={false}>
        {list.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Empty description={t.empty} />
          </motion.div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {list.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              >
                <Card
                  size="small"
                  title={`${index + 1}`}
                  extra={
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeCertification(item.id)}
                    />
                  }
                >
                  <Form layout="vertical" colon={false}>
                    <Form.Item label={t.name}>
                      <Input
                        value={item.name ?? ""}
                        onChange={(e) =>
                          updateCertification(item.id, { name: e.target.value })
                        }
                        placeholder={t.namePh}
                        prefix={<BadgeCheck size={16} />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.issuer}>
                      <Input
                        value={item.issuer ?? ""}
                        onChange={(e) =>
                          updateCertification(item.id, {
                            issuer: e.target.value,
                          })
                        }
                        placeholder={t.issuerPh}
                        prefix={<Building2 size={16} />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.year}>
                      <Input
                        value={(item as any).year ?? ""}
                        onChange={(e) =>
                          updateCertification(item.id, {
                            year: e.target.value,
                          } as any)
                        }
                        placeholder={t.yearPh}
                        prefix={<CalendarOutlined />}
                        inputMode="numeric"
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.link}>
                      <Input
                        value={item.link ?? ""}
                        onChange={(e) =>
                          updateCertification(item.id, { link: e.target.value })
                        }
                        placeholder={t.linkPh}
                        prefix={<LinkOutlined />}
                        allowClear
                      />
                    </Form.Item>
                  </Form>
                </Card>
              </motion.div>
            ))}

            <Button
              block
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addCertification}
            >
              {t.add}
            </Button>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
}
