"use client";

import { create } from "zustand";
import type {
  Resume,
  ResumeContacts,
  ExperienceItem,
  EducationItem,
} from "../types/resume";

type ResumeState = {
  resume: Resume;
  setFullName: (fullName: string) => void;
  setPosition: (position: string) => void;
  setContacts: (contacts: Partial<ResumeContacts>) => void;
  setSummary: (summary: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  setSkills: (skills: string[]) => void;
  reset: () => void;
};

const emptyResume: Resume = {
  fullName: "",
  position: "",
  contacts: {
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  templateKey: "default",
};

const generateId = () => Math.random().toString(36).slice(2, 9);

export const useResumeStore = create<ResumeState>((set) => ({
  resume: emptyResume,

  setFullName: (fullName) =>
    set((state) => ({ resume: { ...state.resume, fullName } })),

  setPosition: (position) =>
    set((state) => ({ resume: { ...state.resume, position } })),

  setContacts: (contacts) =>
    set((state) => ({
      resume: {
        ...state.resume,
        contacts: { ...state.resume.contacts, ...contacts },
      },
    })),

  setSummary: (summary) =>
    set((state) => ({ resume: { ...state.resume, summary } })),

  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          {
            id: generateId(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
      },
    })),

  updateExperience: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((item) => item.id !== id),
      },
    })),

  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          {
            id: generateId(),
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
    })),

  updateEducation: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((item) => item.id !== id),
      },
    })),

  setSkills: (skills) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills,
      },
    })),

  reset: () => ({
    resume: emptyResume,
  }),
}));
