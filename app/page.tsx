import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)]" />

      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
              <span className="text-sm font-semibold text-sky-400">CV</span>
            </div>
            <span className="text-sm font-medium tracking-tight">
              Focused Resume
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/ru/editor"
              className="hidden text-xs text-slate-300 hover:text-white sm:inline-flex"
            >
              Открыть редактор
            </Link>
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-900 shadow-sm transition hover:bg-slate-200"
            >
              Войти через Google
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:py-16">
        <div className="w-full space-y-8 lg:w-[52%]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Пет-проект для сильного резюме под hh.ru и LinkedIn</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Конструктор резюме, который не стыдно показать рекрутеру
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              Собери аккуратное резюме в современном интерфейсе, выбери шаблон, получи
              чистый PDF без лишнего визуального шума и отправь его на вакансии за пару
              кликов.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-xs font-medium text-slate-950 shadow-sm transition hover:bg-sky-400"
            >
              Войти через Google и начать
            </Link>
            <Link
              href="/ru/editor"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-xs font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/5"
            >
              Попробовать без регистраций
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Структура резюме
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Всё, что любят смотреть рекрутеры
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                Опыт, стек, pet-проекты, образование и языки — без воды и лишних полей.
                Только то, что добавляет тебе веса в отклике.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                PDF-экспорт
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Чистые PDF под hh.ru и email
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                Аккуратные макеты без логотипов сервиса, нормальные отступы и
                типографика. Рекрутеры видят тебя, а не рекламу конструктора.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Фокус на фронтенд-разработчиках</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Сохранение нескольких резюме под разные стеки</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>RU и EN версии резюме в одном месте</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[48%]">
          <div className="relative mx-auto h-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/30 via-purple-500/20 to-emerald-400/20 blur-3xl" />

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-sky-500/10">
              <div className="border-b border-white/10 bg-slate-900/80 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-[11px] text-slate-300">
                      Live preview резюме
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    PDF-ready
                  </span>
                </div>
              </div>

              <div className="grid gap-0 border-t border-white/5 bg-slate-900/60 sm:grid-cols-[1.1fr,1.4fr]">
                <div className="border-r border-white/5 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Форма ввода
                  </p>
                  <div className="mt-3 space-y-3 text-[11px]">
                    <div className="space-y-1">
                      <p className="text-slate-400">Полное имя</p>
                      <div className="rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-slate-50">
                        Иванов Иван
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">Позиция</p>
                      <div className="rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-slate-50">
                        Frontend Developer · React / Next.js
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">Стек</p>
                      <div className="rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-slate-200">
                        React · TypeScript · Next.js · Node.js
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Превью резюме
                  </p>
                  <div className="mt-3 rounded-2xl border border-white/5 bg-slate-950/80 px-4 py-3">
                    <div className="border-b border-white/5 pb-3">
                      <p className="text-sm font-semibold text-slate-50">
                        Иванов Иван
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Frontend Developer · React / Next.js
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-500">
                        <span>Москва</span>
                        <span>·</span>
                        <span>you@example.com</span>
                        <span>·</span>
                        <span>github.com/username</span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 text-[11px] text-slate-200">
                      <p className="font-medium text-slate-300">Summary</p>
                      <p className="leading-relaxed text-slate-400">
                        Frontend-разработчик с опытом в React, TypeScript и Next.js.
                        Делаю быстрые и аккуратные интерфейсы, люблю чистый код и
                        понятную архитектуру.
                      </p>
                      <div className="pt-2">
                        <p className="font-medium text-slate-300">Skills</p>
                        <p className="mt-1 text-slate-400">
                          React · TypeScript · Next.js · Node.js · REST · Git · Jest
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-slate-500">
                    Всё, что ты видишь здесь, уходит в PDF без потерь верстки и
                    случайных переносов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
