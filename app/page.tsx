import { AuthButton } from "@/components/AuthButton"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 antialiased">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-slate-950" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-4rem] -z-10 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-emerald-500/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/50">
              <span className="text-sm font-semibold text-emerald-300">CV</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Focused Resume
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300/80">
                for frontend devs
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/ru/editor"
              className="hidden text-xs text-slate-300/80 transition hover:text-slate-50 sm:inline-flex"
            >
              Редактор
            </Link>
            <Link
              href="/ru/editor"
              className="hidden text-xs text-slate-300/80 transition hover:text-slate-50 sm:inline-flex"
            >
              Шаблоны
            </Link>
            <Link
              href="/ru/editor"
              className="hidden text-xs text-slate-300/80 transition hover:text-slate-50 md:inline-flex"
            >
              Примеры резюме
            </Link>

            <div className="hidden h-4 w-px bg-slate-700/60 sm:block" />

            {/* Важно: AuthButton остаётся */}
            <AuthButton />

            <Link
              href="/api/auth/signin"
              className="hidden rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-100 shadow-sm transition hover:border-emerald-300/70 hover:bg-emerald-400/20 sm:inline-flex"
            >
              Войти
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:pb-24 lg:pt-14">
        {/* Left column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200 shadow-[0_0_0_1px_rgba(16,185,129,0.3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <span>Пет-проект под hh.ru, LinkedIn и прямые отклики</span>
            <span className="hidden rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:inline">
              Live preview · PDF
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Конструктор резюме{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                уровня продукта
              </span>{" "}
              для фронтенд-разработчиков
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              Собери аккуратное резюме в интерфейсе, который ощущается как современный
              девтул. Никаких кринжовых шаблонов — только чистая верстка, удобный
              редактор и PDF, за который не стыдно рекрутеру скинуть дальше по цепочке.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_35px_rgba(45,212,191,0.65)] transition hover:brightness-105"
            >
              Войти через Google и начать
            </Link>
            <Link
              href="/ru/editor"
              className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-2.5 text-xs font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Открыть редактор без регистрации
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Заточено под фронтенд-резюме</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Несколько версий под разные стеки</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>RU / EN в одном месте</span>
            </div>
          </div>

          <div className="grid gap-4 text-xs text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                Структура
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Всё, что смотрит рекрутер
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                Опыт, стек, пет-проекты, открытый код, языки — без лишних полей и
                бессмысленных &quot;о себе&quot;.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                PDF-экспорт
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Чистый файл без брендинга
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                Без логотипов сервиса, ровные отступы, нормальная типографика — можно
                сразу грузить на hh.ru или слать в Telegram.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:block">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300/90">
                Фокус
              </p>
              <p className="mt-1 font-medium text-emerald-100">
                Интерфейс &quot;как девтулы&quot;
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-emerald-100/80">
                Формы ощущаются как IDE: предсказуемые поля, понятные подсказки и
                мгновенное превью.
              </p>
            </div>
          </div>
        </div>

        {/* Right column – neon preview card */}
        <div className="relative mt-4 w-full lg:mt-0">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-emerald-500/40 via-teal-400/25 to-sky-500/25 opacity-70 blur-3xl" />

          <div className="overflow-hidden rounded-[26px] border border-slate-800/90 bg-slate-950/80 shadow-[0_0_60px_rgba(45,212,191,0.35)]">
            {/* Card header */}
            <div className="border-b border-slate-800/80 bg-slate-950/90 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-slate-100">
                      resume.tsx
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300/80">
                      Live preview · PDF-ready
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                  FRONTEND
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="grid gap-0 border-t border-slate-900/70 bg-slate-950/70 sm:grid-cols-[1.05fr,1.4fr]">
              {/* Left: form mock */}
              <div className="border-r border-slate-900/70 p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                  Форма ввода
                </p>
                <div className="mt-3 space-y-3 text-[11px]">
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Полное имя</p>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1.5 text-slate-50 shadow-inner shadow-black/40">
                      Иванов Иван
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Позиция</p>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1.5 text-slate-50">
                      Frontend Developer · React / Next.js
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">Стек</p>
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1.5 text-slate-200">
                      React · TypeScript · Next.js · Node.js
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <p className="text-slate-400">Фокус резюме</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-300">
                        middle+
                      </span>
                      <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-300">
                        product
                      </span>
                      <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-300">
                        remote-friendly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: resume preview */}
              <div className="flex flex-col border-t border-slate-900/70 p-4 sm:border-t-0">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                  Превью резюме
                </p>
                <div className="mt-3 grow rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3">
                  <div className="border-b border-slate-800 pb-3">
                    <p className="text-sm font-semibold text-slate-50">
                      Иванов Иван
                    </p>
                    <p className="text-[11px] text-emerald-300/90">
                      Frontend Developer · React / Next.js
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-500">
                      <span>Москва</span>
                      <span>·</span>
                      <span>you@example.com</span>
                      <span>·</span>
                      <span>github.com/username</span>
                      <span>·</span>
                      <span>t.me/handle</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-[11px] text-slate-200">
                    <div>
                      <p className="font-medium text-slate-200">Summary</p>
                      <p className="mt-1 leading-relaxed text-slate-400">
                        Frontend-разработчик с опытом в React, TypeScript и Next.js.
                        Делаю быстрые и аккуратные интерфейсы, люблю чистый код,
                        эффективные ревью и предсказуемые деплои.
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="font-medium text-slate-200">Skills</p>
                      <p className="mt-1 text-slate-400">
                        React · TypeScript · Next.js · Node.js · REST · GraphQL · Git ·
                        Jest · Playwright
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="font-medium text-slate-200">Recent</p>
                      <p className="mt-1 text-slate-400">
                        Вывел продуктовую команду с SPA на Next.js, перевёл критические
                        страницы на SSR и улучшил TTFB на 40%.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-500">
                  Всё, что ты видишь в превью, уходит в PDF без потери верстки, случайных
                  переносов и внезапных логотипов сервиса.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
