"use client";

import { ResumePreviewThumb } from "@/components/resume/ResumePreviewThumb";
import type { ResumeData } from "@/types/resume";
import {
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Pagination,
  Result,
  Spin,
  Tooltip,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, File, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type ResumeListItem = {
  id: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
};

const messages = {
  ru: {
    title: "Мои резюме",
    subtitle: "Управляйте своими профессиональными профилями",
    empty: "Нет сохранённых резюме",
    emptySubtext: "Создайте своё первое резюме, чтобы начать карьеру мечты",
    createResume: "Создать резюме",
    unauthorized: "Войдите, чтобы управлять резюме",
    goHome: "На главную",
    confirmDeleteTitle: "Удалить резюме?",
    confirmDeleteText: "Это действие нельзя отменить.",
    deleteOk: "Удалить",
    deleteCancel: "Отмена",
    searchPlaceholder: "Найти резюме...",
    newResume: "Новое резюме",
    noPosition: "Должность не указана",
    openPdf: "PDF",
    delete: "Удалить",
    updated: "Обновлено",
  },
  en: {
    title: "My Resumes",
    subtitle: "Manage your professional profiles all in one place",
    empty: "No resumes found",
    emptySubtext: "Create your first resume to kickstart your career",
    createResume: "New Resume",
    unauthorized: "Sign in to manage your resumes",
    goHome: "Go Home",
    confirmDeleteTitle: "Delete resume?",
    confirmDeleteText: "This action cannot be undone.",
    deleteOk: "Delete",
    deleteCancel: "Cancel",
    searchPlaceholder: "Search resumes...",
    newResume: "New Resume",
    noPosition: "No position specified",
    openPdf: "PDF",
    delete: "Delete",
    updated: "Updated",
  },
} as const;

export default function MyResumesPage() {
  const params = useParams() as { locale?: "ru" | "en" };
  const locale = params?.locale ?? "en";
  const t = messages[locale] ?? messages.en;
  const router = useRouter();

  const { data: session, status } = useSession();

  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 8;

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !session?.user?.email) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/resumes?userEmail=${encodeURIComponent(
            session.user!.email as string
          )}`
        );
        if (!res.ok) {
          console.error("Failed to load resumes", await res.text());
          return;
        }
        const json = await res.json();
        setResumes(json.resumes || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [status, session?.user]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) return;

    Modal.confirm({
      title: t.confirmDeleteTitle,
      content: t.confirmDeleteText,
      okText: t.deleteOk,
      cancelText: t.deleteCancel,
      okButtonProps: { danger: true, loading: deletingId === id },
      onOk: async () => {
        try {
          setDeletingId(id);
          const res = await fetch(
            `/api/resumes?id=${encodeURIComponent(
              id
            )}&userEmail=${encodeURIComponent(session.user!.email as string)}`,
            { method: "DELETE" }
          );
          if (!res.ok) {
            console.error("Failed to delete resume", await res.text());
            return;
          }
          setResumes((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
          console.error(err);
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const filteredResumes = useMemo(() => {
    if (!search.trim()) return resumes;
    const q = search.toLowerCase();
    return resumes.filter((r) => {
      const fullName = (r.data?.fullName || "").toLowerCase();
      const position = (r.data?.position || "").toLowerCase();
      return fullName.includes(q) || position.includes(q);
    });
  }, [resumes, search]);

  useEffect(() => setPage(1), [search]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredResumes.length / pageSize));
    if (page > maxPage) setPage(maxPage);
  }, [filteredResumes.length, page]);

  const paginatedResumes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredResumes.slice(start, start + pageSize);
  }, [filteredResumes, page]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-4 pb-14 md:p-6 md:pb-14 grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-4 pb-14 md:p-6 md:pb-14 grid place-items-center">
        <Result
          icon={<FileText size={42} className="text-gray-400" />}
          title={t.unauthorized}
          extra={
            <Button type="primary" onClick={() => router.push(`/${locale}`)}>
              {t.goHome}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col gap-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[720px]">
              <h2 className="m-0 text-2xl font-semibold">{t.title}</h2>
              <p className="m-0 text-base text-gray-500">{t.subtitle}</p>
            </div>

            <Link href={`/${locale}/editor`}>
              <Button type="primary" icon={<Plus size={16} />}>
                {t.createResume}
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              prefix={<Search size={16} className="text-gray-400" />}
              className="w-full md:max-w-[420px]"
            />

            {filteredResumes.length > pageSize && (
              <Pagination
                current={page}
                pageSize={pageSize}
                total={filteredResumes.length}
                showSizeChanger={false}
                onChange={(p) => setPage(p)}
              />
            )}
          </div>
        </Card>

        <AnimatePresence mode="popLayout">
          {filteredResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <Card>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{t.empty}</span>
                      <span className="text-gray-500">{t.emptySubtext}</span>
                    </div>
                  }
                >
                  <Link href={`/${locale}/editor`}>
                    <Button type="primary" icon={<Plus size={16} />}>
                      {t.createResume}
                    </Button>
                  </Link>
                </Empty>
              </Card>
            </motion.div>
          ) : (
            <motion.div layout>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedResumes.map((resume, index) => {
                  const data = (resume.data || {}) as any;
                  const title = data.fullName || t.newResume;
                  const subtitle = data.position || t.noPosition;

                  const date = new Date(resume.updatedAt).toLocaleDateString(
                    locale === "ru" ? "ru-RU" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  );

                  const isDeleting = deletingId === resume.id;

                  return (
                    <motion.div
                      key={resume.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.03 },
                      }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="h-full"
                    >
                      <div className="group h-full">
                        <Card hoverable className="h-full">
                          <Link
                            href={`/${locale}/editor?resumeId=${resume.id}`}
                            className="block"
                          >
                            <ResumePreviewThumb
                              data={data}
                              locale={locale}
                              className="mb-3"
                            />

                            <div className="px-1">
                              <div className="text-base font-semibold truncate">
                                {title}
                              </div>
                              <div className="mt-0.5 text-[13px] text-gray-500 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                                {subtitle}
                              </div>
                            </div>
                          </Link>

                          <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 px-1">
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-xs">
                                {t.updated} • {date}
                              </span>
                            </div>

                            <div className="flex gap-1.5 ">
                              <Tooltip title={t.openPdf}>
                                <Link
                                  href={`/${locale}/print/${resume.id}`}
                                  target="_blank"
                                >
                                  <Button
                                    type="text"
                                    shape="circle"
                                    icon={<File size={16} />}
                                  />
                                </Link>
                              </Tooltip>

                              <Tooltip title={t.delete}>
                                <Button
                                  type="text"
                                  danger
                                  shape="circle"
                                  loading={isDeleting}
                                  onClick={(e) => handleDelete(resume.id, e)}
                                  icon={
                                    !isDeleting ? (
                                      <Trash2 size={16} />
                                    ) : undefined
                                  }
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
