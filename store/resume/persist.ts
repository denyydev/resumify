import type { Resume } from "@/types/resume";
import type { PersistOptions } from "zustand/middleware";
import { createEmptyResume } from "./defaults";
import { normalizeResume } from "./normalize";
import type { PersistedResumeState, ResumeState } from "./types";

export const resumePersistOptions: PersistOptions<
  ResumeState,
  PersistedResumeState
> = {
  name: "resume-draft",
  version: 1,

  partialize: (state) => {
    const { photo, ...resumeWithoutPhoto } = state.resume;
    return { resume: resumeWithoutPhoto, isDraft: state.isDraft };
  },

  migrate: (persistedState: unknown, version: number) => {
    if (version === 0) {
      const state = persistedState as
        | { resume?: Partial<Resume>; isDraft?: boolean }
        | null
        | undefined;

      const normalized = normalizeResume(state?.resume ?? createEmptyResume());
      return {
        resume: normalized,
        hasHydrated: false,
        isDraft: state?.isDraft ?? true,
      };
    }
    return persistedState as PersistedResumeState;
  },

  merge: (persistedState: unknown, currentState: ResumeState) => {
    if (currentState.isDraft === false) return currentState;

    const state = persistedState as PersistedResumeState | null | undefined;
    if (state?.resume) {
      const normalized = normalizeResume(state.resume);
      return {
        ...currentState,
        resume: normalized,
        isDraft: state.isDraft ?? true,
      };
    }
    return currentState;
  },

  onRehydrateStorage: () => (state) => {
    if (state) state.hasHydrated = true;
  },
};
