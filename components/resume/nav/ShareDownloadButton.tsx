"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { Button, message } from "antd";
import { FileDown } from "lucide-react";
import { useState } from "react";

interface ShareDownloadButtonProps {
  shareId: string;
  locale: Locale;
  fileName?: string;
}

const messages = {
  ru: {
    downloadPdf: "Скачать PDF",
    error: "Не удалось скачать PDF. Попробуйте позже.",
    networkError: "Ошибка сети. Проверьте подключение к интернету.",
  },
  en: {
    downloadPdf: "Download PDF",
    error: "Failed to download PDF. Please try again later.",
    networkError: "Network error. Please check your internet connection.",
  },
} as const;

export function ShareDownloadButton({
  shareId,
  locale,
  fileName,
}: ShareDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const t = messages[locale];

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/share/${shareId}/pdf`, {
        method: "GET",
      });

      if (!res.ok) {
        message.error(t.error);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const contentDisposition = res.headers.get("Content-Disposition");
      let downloadFileName = fileName ?? `resume-${shareId}.pdf`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (fileNameMatch && fileNameMatch[1]) {
          const extractedFileName = fileNameMatch[1].replace(/['"]/g, "");
          if (extractedFileName) {
            downloadFileName = extractedFileName;
          }
        }
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        message.error(t.networkError);
      } else {
        message.error(t.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      size="large"
      icon={<FileDown className="h-4 w-4" />}
      className="font-medium"
      loading={loading}
      disabled={loading}
      onClick={handleClick}
    >
      {t.downloadPdf}
    </Button>
  );
}

