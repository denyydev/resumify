import type { Resume, SectionsVisibility } from "@/types/resume";
import {
  emptyActivity,
  emptyCertification,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyProject,
} from "./factories";

export const DEFAULT_ACCENT_COLOR = "#1677ff";
export const DEFAULT_INCLUDE_PHOTO = true;

export const DEFAULT_SECTIONS_VISIBILITY: SectionsVisibility = {
  photo: true,
  summary: true,
  contacts: true,
  experience: true,
  projects: true,
  techSkills: true,
  softSkills: true,
  education: true,
  languages: true,
  employmentPreferences: true,
  certifications: true,
  activities: true,
};

export const createEmptyResume = (): Resume => ({
  lastName: "",
  firstName: "",
  patronymic: "",
  position: "",
  contacts: {
    email: "",
    phone: "",
    location: "",
    telegram: "",
    github: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [emptyExperience()],
  projects: [emptyProject()],
  techSkills: { tags: [], note: "" },
  softSkills: { tags: [], note: "" },
  education: [emptyEducation()],
  languages: [emptyLanguage()],
  employmentPreferences: {
    employmentType: [],
    workFormat: [],
    relocation: undefined,
    timezone: "",
    workAuthorization: "",
  },
  certifications: [emptyCertification()],
  activities: [emptyActivity()],
  templateKey: "default",
  accentColor: DEFAULT_ACCENT_COLOR,
  includePhoto: DEFAULT_INCLUDE_PHOTO,
  photo: undefined,
  sectionsVisibility: DEFAULT_SECTIONS_VISIBILITY,
});
