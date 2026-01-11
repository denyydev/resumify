import type { Resume } from "@/types/resume";
import {
  createEmptyResume,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_INCLUDE_PHOTO,
  DEFAULT_SECTIONS_VISIBILITY,
} from "./defaults";
import {
  emptyActivity,
  emptyCertification,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyProject,
  ensureAtLeastOne,
} from "./factories";

export function normalizeResume(resume: Partial<Resume>): Resume {
  const base = createEmptyResume();

  return {
    ...base,
    ...resume,
    accentColor: resume.accentColor ?? DEFAULT_ACCENT_COLOR,
    includePhoto: resume.includePhoto ?? DEFAULT_INCLUDE_PHOTO,
    experience: ensureAtLeastOne(resume.experience, emptyExperience),
    projects: ensureAtLeastOne(resume.projects, emptyProject),
    education: ensureAtLeastOne(resume.education, emptyEducation),
    languages: ensureAtLeastOne(resume.languages, emptyLanguage),
    techSkills: resume.techSkills ?? base.techSkills,
    softSkills: resume.softSkills ?? base.softSkills,
    employmentPreferences:
      resume.employmentPreferences ?? base.employmentPreferences,
    certifications: ensureAtLeastOne(resume.certifications, emptyCertification),
    activities: ensureAtLeastOne(resume.activities, () =>
      emptyActivity("open-source")
    ),
    sectionsVisibility: {
      ...DEFAULT_SECTIONS_VISIBILITY,
      ...(resume.sectionsVisibility ?? {}),
    },
  };
}
