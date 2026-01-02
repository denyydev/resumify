"use client";

import { ArrowRightOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { motion, type Variants } from "framer-motion";
import React from "react";
import type { Locale } from "@/app/i18n";
import { getLandingMessages } from "@/lib/getLandingMessages";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  const t = getLandingMessages(locale);

  const headlineParts = t.hero.headline.split("{highlight}");

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          fontSize: 14,
          colorPrimary: "#6366f1",
        },
      }}
    >
      <section className="relative w-full overflow-hidden bg-white min-h-screen flex items-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent" />
          <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-50/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-blue-50/20 to-transparent rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-4xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center"
            >
              <motion.div variants={item} className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 py-1.5 text-caption text-slate-600 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                  </span>
                  <span className="font-medium">{t.hero.trustSignal}</span>
                </div>
              </motion.div>

              <motion.h1
                variants={item}
                className="text-display-lg font-bold text-slate-900 mb-6"
              >
                {headlineParts[0]}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t.hero.headlineHighlight}
                </span>
                {headlineParts[1]}
              </motion.h1>

              <motion.p
                variants={item}
                className="mx-auto max-w-2xl text-body-lg text-slate-600 mb-10 font-normal"
              >
                {t.hero.subheadline}
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-14"
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  href={`/${locale}/editor`}
                  className="!h-12 !px-8 !text-base !font-semibold shadow-lg shadow-indigo-500/25 hover:!shadow-xl hover:!shadow-indigo-500/30 active:!scale-[0.98] active:!opacity-90 transition-all duration-200 cursor-pointer"
                >
                  {t.hero.ctaPrimary}
                </Button>
                <Button
                  size="large"
                  icon={<PlayCircleOutlined />}
                  href={`/${locale}/editor`}
                  className="!h-12 !px-8 !text-base !font-medium !border-slate-300 hover:!bg-slate-50 hover:!border-slate-400 active:!scale-[0.98] active:!opacity-90 !text-slate-700 transition-all duration-200 cursor-pointer"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </motion.div>

              <motion.div
                variants={item}
                className="flex flex-wrap items-center justify-center gap-8 text-caption text-slate-500"
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-5 w-5 text-green-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="font-medium">{t.hero.features.atsOptimized}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-5 w-5 text-green-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="font-medium">{t.hero.features.instantExport}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-5 w-5 text-green-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="font-medium">{t.hero.features.noSignup}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
