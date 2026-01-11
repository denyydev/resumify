import type {
  ActivityItem,
  CertificationItem,
  EducationItem,
  EmploymentPreferences,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  Resume,
  ResumeContacts,
  ResumeSectionKey,
  TemplateKey,
} from "@/types/resume";

export type ResumeState = {
  resume: Resume;
  hasHydrated: boolean;
  isDraft: boolean;

  setPhoto: (photo?: string) => void;
  loadResume: (resume: Resume) => void;
  reset: () => void;

  setLastName: (lastName: string) => void;
  setFirstName: (firstName: string) => void;
  setPatronymic: (patronymic: string) => void;

  setPosition: (position: string) => void;
  setContacts: (contacts: Partial<ResumeContacts>) => void;
  setSummary: (summary: string) => void;
  setTemplateKey: (templateKey: TemplateKey) => void;

  setAccentColor: (accentColor: string) => void;
  setIncludePhoto: (includePhoto: boolean) => void;

  setEmploymentPreferences: (patch: Partial<EmploymentPreferences>) => void;

  setSectionVisible: (key: ResumeSectionKey, value: boolean) => void;
  toggleSection: (key: ResumeSectionKey) => void;
  showAllSections: () => void;

  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;

  addActivity: (type?: ActivityItem["type"]) => void;
  updateActivity: (id: string, patch: Partial<ActivityItem>) => void;
  removeActivity: (id: string) => void;

  addTechSkillTag: (tag: string) => void;
  removeTechSkillTag: (tag: string) => void;
  setTechSkillsTags: (tags: string[]) => void;
  setTechSkillsNote: (note: string) => void;

  addSoftSkillTag: (tag: string) => void;
  removeSoftSkillTag: (tag: string) => void;
  setSoftSkillsTags: (tags: string[]) => void;
  setSoftSkillsNote: (note: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
};

export type PersistedResumeState = {
  resume: Omit<Resume, "photo">;
  isDraft: boolean;
};
