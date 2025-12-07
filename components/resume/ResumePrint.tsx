"use client"

import type { Resume } from "@/types/resume"
import type { Locale } from "@/lib/useCurrentLocale"

type ResumeTemplateProps = {
  data: Resume
  locale: Locale
}

/** ---------- TEMPLATE 1: CLASSIC (две колонки) ---------- **/
function ClassicTemplate({ data }: ResumeTemplateProps) {
  const { fullName, position, contacts, summary, experience, projects, skills, softSkills, education, languages } =
    data

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 flex">
      {/* Левая колонка */}
      <aside className="w-[260px] bg-slate-50 border-r border-slate-200 px-6 py-6 flex flex-col gap-6">
        {/* Имя / позиция */}
        <div>
          <h1 className="text-xl font-semibold leading-tight">{fullName || "Full Name"}</h1>
          <p className="text-xs text-slate-600 mt-1">{position || "Position"}</p>
        </div>

        {/* Контакты */}
        <div className="space-y-1 text-[11px]">
          {contacts.email && <p>{contacts.email}</p>}
          {contacts.phone && <p>{contacts.phone}</p>}
          {contacts.location && <p>{contacts.location}</p>}
          {contacts.telegram && <p>{contacts.telegram}</p>}
          {contacts.github && <p>{contacts.github}</p>}
          {contacts.linkedin && <p>{contacts.linkedin}</p>}
          {contacts.website && <p>{contacts.website}</p>}
        </div>

        {/* Skills */}
        {skills && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Skills
            </h2>
            <p className="text-[11px] whitespace-pre-line leading-snug">{skills}</p>
          </section>
        )}

        {/* Soft skills */}
        {softSkills && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Soft skills
            </h2>
            <p className="text-[11px] whitespace-pre-line leading-snug">{softSkills}</p>
          </section>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Languages
            </h2>
            <ul className="space-y-0.5 text-[11px]">
              {languages.map((lang) => (
                <li key={lang.id}>
                  {lang.name} {lang.level && <span className="text-slate-500">· {lang.level}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Education
            </h2>
            <ul className="space-y-1 text-[11px]">
              {education.map((item) => (
                <li key={item.id}>
                  <p className="font-medium">{item.degree || item.field}</p>
                  <p className="text-slate-600">{item.institution}</p>
                  {(item.startDate || item.endDate) && (
                    <p className="text-slate-400 text-[10px]">
                      {item.startDate} — {item.endDate || "now"}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Правая колонка */}
      <main className="flex-1 px-8 py-8 space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Summary
            </h2>
            <p className="text-[11px] leading-snug whitespace-pre-line">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between text-[11px]">
                    <p className="font-semibold">
                      {item.position}{" "}
                      {item.company && <span className="text-slate-600">· {item.company}</span>}
                    </p>
                    <p className="text-slate-400">
                      {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                  {item.location && (
                    <p className="text-[10px] text-slate-500 mb-1">{item.location}</p>
                  )}
                  {item.description && (
                    <p className="text-[11px] text-slate-700 whitespace-pre-line leading-snug">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-slate-700 mb-1.5">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="text-[11px]">
                  <p className="font-semibold">
                    {p.name} {p.role && <span className="text-slate-600">· {p.role}</span>}
                  </p>
                  {p.stack && (
                    <p className="text-slate-500 text-[10px] mb-0.5">{p.stack}</p>
                  )}
                  {p.link && (
                    <p className="text-[10px] text-sky-600">{p.link}</p>
                  )}
                  {p.description && (
                    <p className="text-[11px] text-slate-700 whitespace-pre-line leading-snug">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

/** ---------- TEMPLATE 2: MINIMAL (одна колонка, акцент на типографику) ---------- **/
function MinimalTemplate({ data }: ResumeTemplateProps) {
  const { fullName, position, contacts, summary, experience, projects, skills, education, languages } =
    data

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-64 py-10">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{fullName || "Full Name"}</h1>
        <p className="text-xs text-slate-600 mt-1">{position || "Position"}</p>
        <div className="mt-2 flex justify-center gap-3 text-[10px] text-slate-500 flex-wrap">
          {contacts.email && <span>{contacts.email}</span>}
          {contacts.phone && <span>{contacts.phone}</span>}
          {contacts.location && <span>{contacts.location}</span>}
          {contacts.github && <span>{contacts.github}</span>}
          {contacts.linkedin && <span>{contacts.linkedin}</span>}
        </div>
      </header>

      <main className="space-y-5 text-[11px] leading-snug">
        {summary && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Summary
            </h2>
            <p className="whitespace-pre-line text-slate-800">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-4">
                    <p className="font-medium">
                      {item.position}
                      {item.company && <span className="text-slate-600"> · {item.company}</span>}
                    </p>
                    <p className="text-slate-400 text-[10px] whitespace-nowrap">
                      {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                  {item.location && (
                    <p className="text-[10px] text-slate-500 mb-1">{item.location}</p>
                  )}
                  {item.description && (
                    <p className="text-slate-800 whitespace-pre-line">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id}>
                  <p className="font-medium">
                    {p.name}
                    {p.role && <span className="text-slate-600"> · {p.role}</span>}
                  </p>
                  {p.stack && (
                    <p className="text-[10px] text-slate-500 mb-0.5">{p.stack}</p>
                  )}
                  {p.link && (
                    <p className="text-[10px] text-sky-600 mb-0.5">{p.link}</p>
                  )}
                  {p.description && (
                    <p className="text-slate-800 whitespace-pre-line">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Skills
            </h2>
            <p className="text-slate-800 whitespace-pre-line">{skills}</p>
          </section>
        )}

        {(education?.length ?? 0) > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((e) => (
                <div key={e.id}>
                  <p className="font-medium">
                    {e.degree || e.field}
                    {e.institution && <span className="text-slate-600"> · {e.institution}</span>}
                  </p>
                  {(e.startDate || e.endDate) && (
                    <p className="text-[10px] text-slate-500">
                      {e.startDate} — {e.endDate || "now"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {(languages?.length ?? 0) > 0 && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 mb-1">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <span key={l.id} className="text-[11px]">
                  {l.name}
                  {l.level && <span className="text-slate-500"> · {l.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

/** ---------- TEMPLATE 3: MODERN (цветная шапка, аватар) ---------- **/
function ModernTemplate({ data }: ResumeTemplateProps) {
  const { fullName, position, contacts, summary, experience, projects, skills, education, languages, photo } =
    data

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 flex flex-col">
      {/* Цветная шапка */}
      <header className="bg-slate-900 text-white px-8 py-6 flex items-center gap-4">
        {photo ? (
          <img
            src={photo}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/60"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-lg font-semibold">
            {(fullName || "N").trim().charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-xl font-semibold leading-tight">{fullName || "Full Name"}</h1>
          <p className="text-xs text-slate-300 mt-1">{position || "Position"}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-300/90">
            {contacts.location && <span>{contacts.location}</span>}
            {contacts.email && <span>{contacts.email}</span>}
            {contacts.phone && <span>{contacts.phone}</span>}
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-6 grid grid-cols-[1.1fr,0.9fr] gap-6 text-[11px]">
        <div className="space-y-4">
          {summary && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Summary
              </h2>
              <p className="text-slate-800 whitespace-pre-line leading-snug">{summary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Experience
              </h2>
              <div className="space-y-2.5">
                {experience.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between gap-4">
                      <p className="font-medium">
                        {item.position}
                        {item.company && (
                          <span className="text-slate-600"> · {item.company}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                      </p>
                    </div>
                    {item.location && (
                      <p className="text-[10px] text-slate-500 mb-1">{item.location}</p>
                    )}
                    {item.description && (
                      <p className="text-slate-800 whitespace-pre-line leading-snug">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects?.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((p) => (
                  <div key={p.id}>
                    <p className="font-medium">
                      {p.name}
                      {p.role && <span className="text-slate-600"> · {p.role}</span>}
                    </p>
                    {p.stack && (
                      <p className="text-[10px] text-slate-500 mb-0.5">{p.stack}</p>
                    )}
                    {p.link && (
                      <p className="text-[10px] text-sky-600 mb-0.5">{p.link}</p>
                    )}
                    {p.description && (
                      <p className="text-slate-800 whitespace-pre-line leading-snug">
                        {p.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          {skills && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Skills
              </h2>
              <p className="text-slate-800 whitespace-pre-line leading-snug">{skills}</p>
            </section>
          )}

          {education?.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Education
              </h2>
              <div className="space-y-1.5">
                {education.map((e) => (
                  <div key={e.id}>
                    <p className="font-medium">
                      {e.degree || e.field}
                      {e.institution && (
                        <span className="text-slate-600"> · {e.institution}</span>
                      )}
                    </p>
                    {(e.startDate || e.endDate) && (
                      <p className="text-[10px] text-slate-500">
                        {e.startDate} — {e.endDate || "now"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages?.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Languages
              </h2>
              <ul className="space-y-0.5">
                {languages.map((l) => (
                  <li key={l.id}>
                    {l.name}
                    {l.level && <span className="text-slate-500"> · {l.level}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(contacts.github || contacts.linkedin || contacts.website || contacts.telegram) && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-1">
                Links
              </h2>
              <div className="space-y-0.5 text-[11px]">
                {contacts.github && <p>{contacts.github}</p>}
                {contacts.linkedin && <p>{contacts.linkedin}</p>}
                {contacts.website && <p>{contacts.website}</p>}
                {contacts.telegram && <p>{contacts.telegram}</p>}
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  )
}

/** ---------- ROUTER ---------- **/
const templateMap = {
  default: ClassicTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  modern: ModernTemplate,
} as const

export function ResumePrint({ data, locale }: { data: Resume; locale: Locale }) {
  const key = (data.templateKey as keyof typeof templateMap) || "classic"
  const Template = templateMap[key] ?? ClassicTemplate
  return <Template data={data} locale={locale} />
}
