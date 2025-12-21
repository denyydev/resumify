// ✅ FULL UPDATED "@/types/resume" (с Employment / Preferences + Certifications + Open Source / Volunteering)

export type TemplateKey =
  | "default"
  | "classic"
  | "minimal"
  | "modern"
  | "neo"
  | "sidebar"
  | "compact"
  | "simple"
  | "timeline"
  | "grid";

export type Contacts = {
  email: string;
  phone: string;
  location: string;
  telegram?: string;
  github?: string;
  linkedin?: string;
  website?: string; // ✅ у тебя используется в createEmptyResume
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  role: string;
  stack: string;
  link: string;
  description: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  field: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  level: string;
};

// =========================
// ✅ NEW: Employment / Work Preferences
// =========================

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance";
export type WorkFormat = "remote" | "hybrid" | "onsite";

export type EmploymentPreferences = {
  employmentType: EmploymentType[]; // можно []
  workFormat: WorkFormat[]; // можно []
  relocation?: boolean; // готов к релокации
  timezone?: string; // "Europe/Warsaw"
  workAuthorization?: string; // "EU citizen" / "Poland work permit"
};

// =========================
// ✅ NEW: Certifications
// =========================

export type CertificationItem = {
  id: string;
  name: string; // "AWS Certified Developer – Associate"
  issuer: string; // "Amazon Web Services"
  year?: string; // "2025" (строкой удобнее для формы)
  link?: string;
};

// =========================
// ✅ NEW: Open Source / Volunteering
// (общее "activities", чтобы можно было расширять)
// =========================

export type ActivityType = "open-source" | "volunteering" | "community";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  name: string; // проект / организация
  role?: string;
  description?: string;
  link?: string;
};

export type SkillsBlock = {
  tags: string[];
  note: string;
};

export type ResumeData = {
  fullName: string;
  position: string;
  contacts: Contacts;
  summary: string;

  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  languages: LanguageItem[];

  techSkills: SkillsBlock;
  softSkills: SkillsBlock;

  // ✅ existing
  photo?: string;
  templateKey: TemplateKey;

  // ✅ NEW
  employmentPreferences: EmploymentPreferences;
  certifications: CertificationItem[];
  activities: ActivityItem[];

  // ✅ у тебя это хранится в resume (по стору), поэтому фиксируем тут,
  // иначе TS будет ругаться / придется кастовать Resume в сторе.
  accentColor: string;
  includePhoto: boolean;
};

export type Resume = ResumeData;

export type ResumeContacts = Contacts;
