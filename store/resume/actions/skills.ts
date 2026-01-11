import type { StateCreator } from "zustand";
import { uniq } from "../factories";
import type { ResumeState } from "../types";

type ImmerSlice<T> = StateCreator<
  ResumeState,
  [["zustand/immer", never]],
  [],
  T
>;

export const createSkillsActions: ImmerSlice<
  Pick<
    ResumeState,
    | "addTechSkillTag"
    | "removeTechSkillTag"
    | "setTechSkillsTags"
    | "setTechSkillsNote"
    | "addSoftSkillTag"
    | "removeSoftSkillTag"
    | "setSoftSkillsTags"
    | "setSoftSkillsNote"
  >
> = (set) => ({
  addTechSkillTag: (tag) =>
    set((state) => {
      const value = tag.trim();
      if (!value) return;

      const prev = state.resume.techSkills.tags;
      if (prev.includes(value)) return;

      state.resume.techSkills.tags.push(value);
    }),

  removeTechSkillTag: (tag) =>
    set((state) => {
      state.resume.techSkills.tags = state.resume.techSkills.tags.filter(
        (t) => t !== tag
      );
    }),

  setTechSkillsTags: (tags) =>
    set((state) => {
      state.resume.techSkills.tags = uniq(tags);
    }),

  setTechSkillsNote: (note) =>
    set((state) => {
      state.resume.techSkills.note = note;
    }),

  addSoftSkillTag: (tag) =>
    set((state) => {
      const value = tag.trim();
      if (!value) return;

      const prev = state.resume.softSkills.tags;
      if (prev.includes(value)) return;

      state.resume.softSkills.tags.push(value);
    }),

  removeSoftSkillTag: (tag) =>
    set((state) => {
      state.resume.softSkills.tags = state.resume.softSkills.tags.filter(
        (t) => t !== tag
      );
    }),

  setSoftSkillsTags: (tags) =>
    set((state) => {
      state.resume.softSkills.tags = uniq(tags);
    }),

  setSoftSkillsNote: (note) =>
    set((state) => {
      state.resume.softSkills.note = note;
    }),
});
