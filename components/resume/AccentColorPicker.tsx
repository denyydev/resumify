"use client";

import React from "react";
import { Tooltip } from "antd";
import { useResumeStore } from "@/store/useResumeStore";

type AccentColor = {
  name: string;
  value: string;
};

const COLORS: AccentColor[] = [
  { name: "Blue", value: "#1677ff" },
  { name: "Purple", value: "#722ed1" },
  { name: "Magenta", value: "#eb2f96" },
  { name: "Red", value: "#f5222d" },
  { name: "Orange", value: "#fa8c16" },
  { name: "Green", value: "#52c41a" },
];

export type AccentColorPickerProps = {
  disabled?: boolean;
  className?: string;
};

export default function AccentColorPicker({ disabled, className }: AccentColorPickerProps) {
  const accentColor = useResumeStore((s) => s.resume.accentColor);
  const setAccentColor = useResumeStore((s) => s.setAccentColor);

  const current = accentColor ?? COLORS[0].value;

  return (
    <div>
      <div className="flex-1 min-w-0 mb-5">
        <span className="text-sm font-semibold block">Выберите акцентный цвет</span>
        <span className="text-xs leading-relaxed">
          Этот цвет будет использован при экспорте PDF
        </span>
      </div>

      <div className={"flex items-center justify-center gap-3 " + (className ?? "")}>
        {COLORS.map((c) => {
          const selected = current === c.value;

          return (
            <Tooltip key={c.value} title={c.name} placement="top">
              <button
                type="button"
                disabled={disabled}
                onClick={() => setAccentColor(c.value)}
                aria-label={`Select accent color ${c.name}`}
                aria-pressed={selected}
                className={
                  "relative h-8 w-8 rounded-full transition " +
                  (disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:scale-[1.06] active:scale-[0.98]")
                }
                style={{
                  backgroundColor: c.value,
                  boxShadow: selected
                    ? `0 0 0 3px rgba(255,255,255,1), 0 0 0 5px ${c.value}`
                    : "0 0 0 1px rgba(0,0,0,0.06) inset",
                }}
              >
                <span className="sr-only">{c.name}</span>
                {selected && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.08) inset" }}
                  />
                )}
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
