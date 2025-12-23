"use client";

import { useResumeStore } from "@/store/useResumeStore";

export function ResumeForm() {
  const { resume, setFullName, setPosition, setContacts, setSummary, reset } =
    useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          Основная информация
        </h2>
        <p className="text-sm text-slate-500">
          Начнём с базовых данных, которые будут в шапке резюме.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Полное имя
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            placeholder="Иванов Иван Иванович"
            value={resume.fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Желаемая позиция
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            placeholder="Frontend Developer / React"
            value={resume.position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
              placeholder="you@example.com"
              value={resume.contacts.email}
              onChange={(e) =>
                setContacts({
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Телефон
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
              placeholder="+7 ..."
              value={resume.contacts.phone}
              onChange={(e) =>
                setContacts({
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Город</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
              placeholder="Москва / Санкт-Петербург / Remote"
              value={resume.contacts.location}
              onChange={(e) =>
                setContacts({
                  location: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              GitHub / сайт
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
              placeholder="https://github.com/username"
              value={resume.contacts.github ?? ""}
              onChange={(e) =>
                setContacts({
                  github: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Краткое резюме (summary)
          </label>
          <textarea
            className="w-full min-h-[100px] rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            placeholder="Пара предложений о твоем опыте, стеке и сильных сторонах..."
            value={resume.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          className="text-xs text-slate-500 hover:text-slate-700"
          onClick={reset}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
