import type { Resume } from "@/types/resume";

export type DashboardMetric = {
  key: string;
  label: string;
  value: string;
  status: "good" | "warn" | "bad";
};

export type DashboardHint = {
  key: string;
  title: string;
  description: string;
  section:
    | "basic"
    | "summary"
    | "experience"
    | "skills"
    | "education"
    | "languages";
};

const clean = (s?: string) => (s ?? "").trim();
const has = (s?: string) => clean(s).length > 0;

export function computeResumeScore(resume: Resume) {
  const checks = [
    { key: "fullName", weight: 10, ok: has(resume.fullName) },
    { key: "position", weight: 10, ok: has(resume.position) },

    { key: "email", weight: 8, ok: has(resume.contacts.email) },
    { key: "phone", weight: 6, ok: has(resume.contacts.phone) },
    { key: "location", weight: 6, ok: has(resume.contacts.location) },
    { key: "photo", weight: 4, ok: !!resume.photo },

    { key: "summary", weight: 10, ok: clean(resume.summary).length >= 120 },

    { key: "experienceAny", weight: 12, ok: resume.experience.length > 0 },
    {
      key: "experienceDesc",
      weight: 6,
      ok: resume.experience.some((e) => clean(e.description).length >= 60),
    },

    { key: "techTags", weight: 8, ok: resume.techSkills.tags.length >= 5 },
    { key: "softTags", weight: 6, ok: resume.softSkills.tags.length >= 5 },
    {
      key: "techNote",
      weight: 2,
      ok: clean(resume.techSkills.note).length >= 40,
    },
    {
      key: "softNote",
      weight: 2,
      ok: clean(resume.softSkills.note).length >= 40,
    },

    { key: "education", weight: 4, ok: resume.education.length > 0 },
    { key: "languages", weight: 4, ok: resume.languages.length > 0 },
  ];

  const total = checks.reduce((s, c) => s + c.weight, 0);
  const gained = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  const percent = Math.round((gained / total) * 100);

  const missing = (k: string) => checks.find((c) => c.key === k)?.ok === false;

  const hints: DashboardHint[] = [
    missing("fullName") && {
      key: "h_fullName",
      title: "Добавь имя — так резюме выглядит завершённым",
      description: "Укажи ФИО, чтобы шапка резюме не выглядела пустой.",
      section: "basic",
    },
    missing("position") && {
      key: "h_position",
      title: "Уточни желаемую позицию",
      description: "Например: Frontend Developer (React/Next.js).",
      section: "basic",
    },
    missing("email") && {
      key: "h_email",
      title: "Добавь email для связи",
      description: "Это один из ключевых контактов для рекрутера.",
      section: "basic",
    },
    missing("summary") && {
      key: "h_summary",
      title: "Сделай краткое резюме сильнее",
      description:
        "2–4 предложения: опыт, стек, ценность. Идеально от 120 символов.",
      section: "summary",
    },
    missing("experienceAny") && {
      key: "h_exp",
      title: "Добавь хотя бы 1 опыт",
      description: "Без опыта резюме сильно теряет вес.",
      section: "experience",
    },
    missing("techTags") && {
      key: "h_tech",
      title: "Добавь 5+ технологий в стек",
      description: "Так резюме легче матчится по ключевым словам.",
      section: "skills",
    },
    missing("softTags") && {
      key: "h_soft",
      title: "Добавь 5+ soft skills",
      description: "Покажи, как ты работаешь в команде и решаешь задачи.",
      section: "skills",
    },
  ].filter(Boolean) as DashboardHint[];

  const nextHint = hints[0] ?? null;

  const metrics: DashboardMetric[] = [
    {
      key: "score",
      label: "Готовность",
      value: `${percent}%`,
      status: percent >= 80 ? "good" : percent >= 50 ? "warn" : "bad",
    },
    {
      key: "experience",
      label: "Опыт",
      value: resume.experience.length
        ? `${resume.experience.length} поз.`
        : "нет",
      status: resume.experience.length ? "good" : "bad",
    },
    {
      key: "skills",
      label: "Стек",
      value: `${resume.techSkills.tags.length} tech / ${resume.softSkills.tags.length} soft`,
      status:
        resume.techSkills.tags.length >= 5 && resume.softSkills.tags.length >= 5
          ? "good"
          : "warn",
    },
    {
      key: "contacts",
      label: "Контакты",
      value:
        [
          resume.contacts.email,
          resume.contacts.phone,
          resume.contacts.location,
        ].filter(has).length + "/3",
      status:
        [
          resume.contacts.email,
          resume.contacts.phone,
          resume.contacts.location,
        ].filter(has).length >= 2
          ? "good"
          : "warn",
    },
  ];

  return { percent, metrics, nextHint, gained, total };
}
