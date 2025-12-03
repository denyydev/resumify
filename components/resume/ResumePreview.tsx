"use client";

import { useResumeStore } from "@/store/useResumeStore";

export function ResumePreview() {
  const { resume } = useResumeStore();

  return (
    <div className="flex justify-center">
      <div className="bg-white w-[794px] min-h-[1123px] shadow-sm border px-10 py-10">

        <header className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {resume.fullName || "Ваше имя"}
          </h1>
          <p className="text-lg text-slate-600">
            {resume.position || "Желаемая позиция"}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            {resume.contacts.location && (
              <span>{resume.contacts.location}</span>
            )}
            {resume.contacts.email && (
              <span>{resume.contacts.email}</span>
            )}
            {resume.contacts.phone && (
              <span>{resume.contacts.phone}</span>
            )}
            {resume.contacts.github && (
              <span>{resume.contacts.github}</span>
            )}
          </div>
        </header>


        {resume.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-wide text-slate-700 uppercase mb-2">
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {resume.summary}
            </p>
          </section>
        )}


        {!resume.summary && (
          <p className="text-sm text-slate-400">
            Начните заполнять форму слева — здесь появится превью резюме.
          </p>
        )}
      </div>
    </div>
  );
}
