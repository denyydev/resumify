import type { ResumeSectionKey } from "@/types/resume";
import type { StateCreator } from "zustand";
import { DEFAULT_SECTIONS_VISIBILITY } from "../defaults";
import type { ResumeState } from "../types";

type ImmerSlice<T> = StateCreator<
  ResumeState,
  [["zustand/immer", never]],
  [],
  T
>;

export const createSectionsActions: ImmerSlice<
  Pick<ResumeState, "setSectionVisible" | "toggleSection" | "showAllSections">
> = (set) => ({
  setSectionVisible: (key: ResumeSectionKey, value: boolean) =>
    set((state) => {
      state.resume.sectionsVisibility = {
        ...DEFAULT_SECTIONS_VISIBILITY,
        ...(state.resume.sectionsVisibility ?? {}),
        [key]: value,
      };
    }),

  toggleSection: (key: ResumeSectionKey) =>
    set((state) => {
      const current =
        state.resume.sectionsVisibility?.[key] ??
        DEFAULT_SECTIONS_VISIBILITY[key];

      state.resume.sectionsVisibility = {
        ...DEFAULT_SECTIONS_VISIBILITY,
        ...(state.resume.sectionsVisibility ?? {}),
        [key]: !current,
      };
    }),

  showAllSections: () =>
    set((state) => {
      state.resume.sectionsVisibility = { ...DEFAULT_SECTIONS_VISIBILITY };
    }),
});
