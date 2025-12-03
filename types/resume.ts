export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type ResumeContacts = {
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

export type Resume = {
  fullName: string;
  position: string;
  contacts: ResumeContacts;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  templateKey: string;
};
