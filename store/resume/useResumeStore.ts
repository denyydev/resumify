"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createCoreActions } from "./actions/core";
import { createListsActions } from "./actions/lists";
import { createSectionsActions } from "./actions/sections";
import { createSkillsActions } from "./actions/skills";
import { createEmptyResume } from "./defaults";
import { resumePersistOptions } from "./persist";
import type { ResumeState } from "./types";

export const useResumeStore = create<ResumeState>()(
  persist(
    immer((set, get, store) => ({
      resume: createEmptyResume(),
      hasHydrated: false,
      isDraft: true,

      ...createCoreActions(set, get, store),
      ...createSectionsActions(set, get, store),
      ...createSkillsActions(set, get, store),
      ...createListsActions(set, get, store),
    })),
    resumePersistOptions
  )
);
