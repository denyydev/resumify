// components/resume/ResumePrint.tsx

import type {
  Resume,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  LanguageItem,
} from "@/types/resume"

type ResumePrintProps = {
  data: Resume
  locale: "ru" | "en"
}

const DICT = {
  ru: {
    summary: "О себе",
    experience: "Опыт работы",
    projects: "Проекты",
    skills: "Навыки",
    softSkills: "Софт скиллы",
    education: "Образование",
    languages: "Языки",
    contacts: "Контакты",
    present: "по настоящее время",
  },
  en: {
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    softSkills: "Soft Skills",
    education: "Education",
    languages: "Languages",
    contacts: "Contacts",
    present: "Present",
  },
}

export function ResumePrint({ data, locale }: ResumePrintProps) {
  const t = DICT[locale] ?? DICT.en

  const {
    fullName,
    position,
    contacts,
    summary,
    experience,
    projects,
    skills,
    softSkills,
    education,
    languages,
  } = data

  const hasContacts =
    contacts.email ||
    contacts.phone ||
    contacts.location ||
    contacts.telegram ||
    contacts.github ||
    contacts.linkedin ||
    contacts.website

  const hasRightColumn =
    skills ||
    softSkills ||
    (languages && languages.length > 0) ||
    hasContacts

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-[800px] mx-auto py-10 px-10 text-[11px] leading-snug">
        {/* Header */}
        <header className="border-b border-gray-300 pb-4 mb-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            {fullName || (locale === "ru" ? "Имя Фамилия" : "Full Name")}
          </h1>
          {position && (
            <p className="mt-1 text-sm font-medium text-gray-700">
              {position}
            </p>
          )}

          {hasContacts && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-600">
              {contacts.location && (
                <span>{contacts.location}</span>
              )}
              {contacts.email && (
                <span>
                  {contacts.email}
                </span>
              )}
              {contacts.phone && (
                <span>{contacts.phone}</span>
              )}
              {contacts.telegram && (
                <span>{contacts.telegram}</span>
              )}
              {contacts.github && (
                <span>{contacts.github}</span>
              )}
              {contacts.linkedin && (
                <span>{contacts.linkedin}</span>
              )}
              {contacts.website && (
                <span>{contacts.website}</span>
              )}
            </div>
          )}
        </header>

        {/* Main layout */}
        <div
          className={
            hasRightColumn
              ? "grid grid-cols-[2.2fr,1fr] gap-6"
              : "grid grid-cols-1"
          }
        >
          {/* LEFT COLUMN – main content */}
          <div className="space-y-4">
            {/* Summary */}
            {summary && (
              <Section title={t.summary}>
                <p className="whitespace-pre-line text-[11px]">
                  {summary}
                </p>
              </Section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <Section title={t.experience}>
                <div className="space-y-3">
                  {experience.map((item) => (
                    <ExperienceBlock
                      key={item.id}
                      item={item}
                      locale={locale}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <Section title={t.projects}>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <ProjectBlock key={project.id} item={project} />
                  ))}
                </div>
              </Section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <Section title={t.education}>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <EducationBlock key={edu.id} item={edu} />
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* RIGHT COLUMN – sidebar */}
          {hasRightColumn && (
            <aside className="space-y-4">
              {/* Contacts as block (для ATS/читаемости) */}
              {hasContacts && (
                <Section title={t.contacts}>
                  <InfoList>
                    {contacts.email && (
                      <InfoItem label="Email" value={contacts.email} />
                    )}
                    {contacts.phone && (
                      <InfoItem label={locale === "ru" ? "Телефон" : "Phone"} value={contacts.phone} />
                    )}
                    {contacts.location && (
                      <InfoItem
                        label={locale === "ru" ? "Город" : "Location"}
                        value={contacts.location}
                      />
                    )}
                    {contacts.telegram && (
                      <InfoItem label="Telegram" value={contacts.telegram} />
                    )}
                    {contacts.github && (
                      <InfoItem label="GitHub" value={contacts.github} />
                    )}
                    {contacts.linkedin && (
                      <InfoItem label="LinkedIn" value={contacts.linkedin} />
                    )}
                    {contacts.website && (
                      <InfoItem
                        label={locale === "ru" ? "Сайт" : "Website"}
                        value={contacts.website}
                      />
                    )}
                  </InfoList>
                </Section>
              )}

              {/* Skills */}
              {skills && (
                <Section title={t.skills}>
                  <TagList text={skills} />
                </Section>
              )}

              {/* Soft Skills */}
              {softSkills && (
                <Section title={t.softSkills}>
                  <TagList text={softSkills} />
                </Section>
              )}

              {/* Languages */}
              {languages && languages.length > 0 && (
                <Section title={t.languages}>
                  <ul className="space-y-1">
                    {languages.map((lang: LanguageItem) => (
                      <li key={lang.id} className="flex justify-between gap-2">
                        <span className="font-medium">
                          {lang.name}
                        </span>
                        {lang.level && (
                          <span className="text-[10px] text-gray-600">
                            {lang.level}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------- Helpers -------------------- */

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-700 border-b border-gray-200 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}

type ExperienceBlockProps = {
  item: ExperienceItem
  locale: "ru" | "en"
}

function ExperienceBlock({ item, locale }: ExperienceBlockProps) {
  const { company, position, location, startDate, endDate, isCurrent, description } = item
  const presentLabel = locale === "ru" ? "по настоящее время" : "Present"

  return (
    <div className="border-l border-gray-200 pl-3">
      <div className="flex justify-between gap-2">
        <div>
          {position && (
            <p className="text-[11px] font-semibold">
              {position}
            </p>
          )}
          <p className="text-[11px] text-gray-700">
            {company}
            {company && location ? " • " : ""}
            {location}
          </p>
        </div>
        {(startDate || endDate || isCurrent) && (
          <p className="text-[10px] text-gray-500 whitespace-nowrap">
            {startDate}
            {(endDate || isCurrent) && " — "}
            {isCurrent ? presentLabel : endDate}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-1 text-[11px] text-gray-800 whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  )
}

type ProjectBlockProps = {
  item: ProjectItem
}

function ProjectBlock({ item }: ProjectBlockProps) {
  const { name, role, stack, link, description } = item
  return (
    <div className="border-l border-gray-200 pl-3">
      <div className="flex justify-between gap-2">
        <div>
          {name && (
            <p className="text-[11px] font-semibold">
              {name}
            </p>
          )}
          {(role || stack) && (
            <p className="text-[10px] text-gray-700">
              {role}
              {role && stack ? " • " : ""}
              {stack}
            </p>
          )}
        </div>
        {link && (
          <p className="text-[10px] text-gray-500 text-right break-all">
            {link}
          </p>
        )}
      </div>
      {description && (
        <p className="mt-1 text-[11px] text-gray-800 whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  )
}

type EducationBlockProps = {
  item: EducationItem
}

function EducationBlock({ item }: EducationBlockProps) {
  const { institution, degree, field, startDate, endDate } = item
  return (
    <div className="border-l border-gray-200 pl-3">
      <div className="flex justify-between gap-2">
        <div>
          {institution && (
            <p className="text-[11px] font-semibold">
              {institution}
            </p>
          )}
          {(degree || field) && (
            <p className="text-[10px] text-gray-700">
              {degree}
              {degree && field ? " • " : ""}
              {field}
            </p>
          )}
        </div>
        {(startDate || endDate) && (
          <p className="text-[10px] text-gray-500 whitespace-nowrap">
            {startDate}
            {endDate && " — "}
            {endDate}
          </p>
        )}
      </div>
    </div>
  )
}

type InfoItemProps = {
  label: string
  value: string
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <li className="flex flex-col">
      <span className="text-[9px] uppercase tracking-[0.16em] text-gray-500">
        {label}
      </span>
      <span className="text-[10px] text-gray-800 break-all">
        {value}
      </span>
    </li>
  )
}

type InfoListProps = {
  children: React.ReactNode
}

function InfoList({ children }: InfoListProps) {
  return <ul className="space-y-1">{children}</ul>
}

type TagListProps = {
  text: string
}

/**
 * Ожидаем, что skills / softSkills будут строкой с запятыми
 * или переносами строк. Разбиваем на "теги".
 */
function TagList({ text }: TagListProps) {
  const items = text
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)

  if (items.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span
          key={i}
          className="border border-gray-300 rounded-full px-2 py-[2px] text-[9px] text-gray-800"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
