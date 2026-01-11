import type {
  ActivityItem,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
} from "@/types/resume";
import type { StateCreator } from "zustand";

import {
  emptyActivity,
  emptyCertification,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyProject,
} from "../factories";
import type { ResumeState } from "../types";

type ImmerSlice<T> = StateCreator<
  ResumeState,
  [["zustand/immer", never]],
  [],
  T
>;

type WithId = { id: string };

function updateById<T extends WithId>(
  list: T[],
  id: string,
  patch: Partial<T>
) {
  const item = list.find((x) => x.id === id);
  if (!item) return;
  Object.assign(item, patch);
}

function removeById<T extends WithId>(list: T[], id: string) {
  return list.filter((x) => x.id !== id);
}

function ensureOne<T>(list: T[], createOne: () => T) {
  return list.length > 0 ? list : [createOne()];
}

export const createListsActions: ImmerSlice<
  Pick<
    ResumeState,
    | "addExperience"
    | "updateExperience"
    | "removeExperience"
    | "addProject"
    | "updateProject"
    | "removeProject"
    | "addEducation"
    | "updateEducation"
    | "removeEducation"
    | "addLanguage"
    | "updateLanguage"
    | "removeLanguage"
    | "addCertification"
    | "updateCertification"
    | "removeCertification"
    | "addActivity"
    | "updateActivity"
    | "removeActivity"
  >
> = (set) => ({
  addExperience: () =>
    set((state) => {
      state.resume.experience.push(emptyExperience());
    }),

  updateExperience: (id: string, patch: Partial<ExperienceItem>) =>
    set((state) => {
      updateById(state.resume.experience, id, patch);
    }),

  removeExperience: (id: string) =>
    set((state) => {
      state.resume.experience = removeById(state.resume.experience, id);
      state.resume.experience = ensureOne(
        state.resume.experience,
        emptyExperience
      );
    }),

  addProject: () =>
    set((state) => {
      state.resume.projects.push(emptyProject());
    }),

  updateProject: (id: string, patch: Partial<ProjectItem>) =>
    set((state) => {
      updateById(state.resume.projects, id, patch);
    }),

  removeProject: (id: string) =>
    set((state) => {
      state.resume.projects = removeById(state.resume.projects, id);
      state.resume.projects = ensureOne(state.resume.projects, emptyProject);
    }),

  addEducation: () =>
    set((state) => {
      state.resume.education.push(emptyEducation());
    }),

  updateEducation: (id: string, patch: Partial<EducationItem>) =>
    set((state) => {
      updateById(state.resume.education, id, patch);
    }),

  removeEducation: (id: string) =>
    set((state) => {
      state.resume.education = removeById(state.resume.education, id);
      state.resume.education = ensureOne(
        state.resume.education,
        emptyEducation
      );
    }),

  addLanguage: () =>
    set((state) => {
      state.resume.languages.push(emptyLanguage());
    }),

  updateLanguage: (id: string, patch: Partial<LanguageItem>) =>
    set((state) => {
      updateById(state.resume.languages, id, patch);
    }),

  removeLanguage: (id: string) =>
    set((state) => {
      state.resume.languages = removeById(state.resume.languages, id);
      state.resume.languages = ensureOne(state.resume.languages, emptyLanguage);
    }),

  addCertification: () =>
    set((state) => {
      state.resume.certifications ??= [];
      state.resume.certifications.push(emptyCertification());
    }),

  updateCertification: (id: string, patch: Partial<CertificationItem>) =>
    set((state) => {
      state.resume.certifications ??= [];
      updateById(state.resume.certifications, id, patch);
    }),

  removeCertification: (id: string) =>
    set((state) => {
      state.resume.certifications ??= [];
      state.resume.certifications = removeById(state.resume.certifications, id);
      state.resume.certifications = ensureOne(
        state.resume.certifications,
        emptyCertification
      );
    }),

  addActivity: (type: ActivityItem["type"] = "open-source") =>
    set((state) => {
      state.resume.activities ??= [];
      state.resume.activities.push(emptyActivity(type));
    }),

  updateActivity: (id: string, patch: Partial<ActivityItem>) =>
    set((state) => {
      state.resume.activities ??= [];
      updateById(state.resume.activities, id, patch);
    }),

  removeActivity: (id: string) =>
    set((state) => {
      state.resume.activities ??= [];
      state.resume.activities = removeById(state.resume.activities, id);
      state.resume.activities = ensureOne(state.resume.activities, () =>
        emptyActivity("open-source")
      );
    }),
});
