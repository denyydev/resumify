import type {
  ActivityItem,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
} from "@/types/resume";
import { nanoid } from "nanoid";

export const emptyExperience = (): ExperienceItem => ({
  id: nanoid(),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

export const emptyProject = (): ProjectItem => ({
  id: nanoid(),
  name: "",
  role: "",
  stack: "",
  link: "",
  description: "",
});

export const emptyEducation = (): EducationItem => ({
  id: nanoid(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

export const emptyLanguage = (): LanguageItem => ({
  id: nanoid(),
  name: "",
  level: "",
});

export const emptyCertification = (): CertificationItem => ({
  id: nanoid(),
  name: "",
  issuer: "",
  year: "",
  link: "",
});

export const emptyActivity = (
  type: ActivityItem["type"] = "open-source"
): ActivityItem => ({
  id: nanoid(),
  type,
  name: "",
  role: "",
  description: "",
  link: "",
});

export function ensureAtLeastOne<T>(
  arr: T[] | undefined | null,
  createOne: () => T
): T[] {
  return Array.isArray(arr) && arr.length > 0 ? arr : [createOne()];
}

export function uniq(list: string[]) {
  return [...new Set(list.map((x) => x.trim()).filter(Boolean))];
}
