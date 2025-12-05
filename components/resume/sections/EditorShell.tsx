"use client"

import { Card, Tabs } from "antd"
import type { TabsProps } from "antd"
import { BasicSection } from "./BasicSection"
import { ExperienceSection } from "./ExperienceSection"
import { SkillsSection } from "./SkillsSection"
import { ProjectsSection } from "./ProjectsSection"
import { EducationSection } from "./EducationSection"

const tabItems: TabsProps["items"] = [
  {
    key: "basic",
    label: "Основное",
    children: <BasicSection />,
  },
  {
    key: "experience",
    label: "Опыт",
    children: <ExperienceSection />,
  },
  {
    key: "skills",
    label: "Навыки",
    children: <SkillsSection />,
  },
  {
    key: "projects",
    label: "Проекты",
    children: <ProjectsSection />,
  },
  {
    key: "education",
    label: "Образование",
    children: <EducationSection />,
  },
]

export function EditorShell() {
  return (
    <Card className="h-full rounded-2xl border-slate-200 shadow-sm">
      <Tabs
        defaultActiveKey="basic"
        items={tabItems}
        className="editor-tabs"
      />
    </Card>
  )
}
