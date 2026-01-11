import type {
  EmploymentPreferences,
  Resume,
  ResumeContacts,
  TemplateKey,
} from "@/types/resume";
import type { StateCreator } from "zustand";

import { createEmptyResume } from "../defaults";
import { normalizeResume } from "../normalize";
import type { ResumeState } from "../types";

type ImmerSlice<T> = StateCreator<
  ResumeState,
  [["zustand/immer", never]],
  [],
  T
>;

export const createCoreActions: ImmerSlice<
  Pick<
    ResumeState,
    | "setPhoto"
    | "loadResume"
    | "reset"
    | "setLastName"
    | "setFirstName"
    | "setPatronymic"
    | "setPosition"
    | "setContacts"
    | "setSummary"
    | "setTemplateKey"
    | "setAccentColor"
    | "setIncludePhoto"
    | "setEmploymentPreferences"
  >
> = (set) => ({
  setPhoto: (photo) =>
    set((state) => {
      state.resume.photo = photo;
    }),

  loadResume: (resume: Resume) =>
    set((state) => {
      state.resume = normalizeResume(resume);
      state.isDraft = false;
    }),

  reset: () => {
    set((state) => {
      state.resume = createEmptyResume();
      state.isDraft = true;
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("resume-draft");
    }
  },

  setLastName: (lastName: string) =>
    set((state) => {
      state.resume.lastName = lastName;
    }),

  setFirstName: (firstName: string) =>
    set((state) => {
      state.resume.firstName = firstName;
    }),

  setPatronymic: (patronymic: string) =>
    set((state) => {
      state.resume.patronymic = patronymic;
    }),

  setPosition: (position: string) =>
    set((state) => {
      state.resume.position = position;
    }),

  setContacts: (contacts: Partial<ResumeContacts>) =>
    set((state) => {
      state.resume.contacts = { ...state.resume.contacts, ...contacts };
    }),

  setSummary: (summary: string) =>
    set((state) => {
      state.resume.summary = summary;
    }),

  setTemplateKey: (templateKey: TemplateKey) =>
    set((state) => {
      state.resume.templateKey = templateKey;
    }),

  setAccentColor: (accentColor: string) =>
    set((state) => {
      state.resume.accentColor = accentColor;
    }),

  setIncludePhoto: (includePhoto: boolean) =>
    set((state) => {
      state.resume.includePhoto = includePhoto;
    }),

  setEmploymentPreferences: (patch: Partial<EmploymentPreferences>) =>
    set((state) => {
      state.resume.employmentPreferences = {
        ...state.resume.employmentPreferences,
        ...patch,
      };
    }),
});
