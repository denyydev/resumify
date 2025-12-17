"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { floatAnimation } from "./landing.motion"

export default function CtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-emerald-500/20" />

          <div className="relative px-8 py-16 text-center lg:px-16">
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
              animate={floatAnimation}
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-neutral-200">Готовы приблизить работу мечты?</span>
            </motion.div>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
              Начните путь к{" "}
              <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                карьерному росту
              </span>{" "}
              уже сегодня
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200 lg:text-xl">
              Присоединяйтесь к профессионалам, которые обновили резюме и ускорили развитие карьеры
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/api/auth/signin"
                  className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/25 lg:text-lg"
                >
                  Создать аккаунт бесплатно
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/examples"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 lg:text-lg"
                >
                  Посмотреть шаблоны
                </Link>
              </motion.div>
            </div>

            <p className="mt-8 text-sm text-neutral-400">Бесплатный тариф навсегда • Карта не нужна</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
