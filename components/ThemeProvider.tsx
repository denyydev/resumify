"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { ConfigProvider, theme } from "antd";
import { useEffect, type ReactNode } from "react";

function cssVarRgb(name: string) {
  if (typeof window === "undefined") return "0, 0, 0";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .replace(/\s+/g, ", ");
}

function getAntdTheme(isDark: boolean) {
  const bg = `rgb(${cssVarRgb("--bg")})`;
  const surface = `rgb(${cssVarRgb("--surface")})`;
  const surface2 = `rgb(${cssVarRgb("--surface-2")})`;
  const border = `rgb(${cssVarRgb("--border")})`;

  const text = `rgb(${cssVarRgb("--text")})`;
  const text2 = `rgb(${cssVarRgb("--text-2")})`;
  const text3 = `rgb(${cssVarRgb("--text-3")})`;

  const primary = `rgb(${cssVarRgb("--primary")})`;

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: primary,
      colorInfo: primary,

      colorBgBase: bg,
      colorBgLayout: bg,
      colorBgContainer: surface,
      colorBgElevated: surface2,

      colorText: text,
      colorTextSecondary: text2,
      colorTextTertiary: text3,

      colorBorder: border,
      colorBorderSecondary: border,

      borderRadius: 12,
      borderRadiusLG: 16,
      lineWidth: 1,
    },
    components: {
      Button: {
        borderRadius: 12,
        controlHeight: 42,
        fontWeight: 500,
      },
      Input: {
        borderRadius: 12,
        controlHeight: 42,
      },
      Select: {
        borderRadius: 12,
        controlHeight: 42,
      },
      Dropdown: {
        borderRadius: 16,
        paddingBlock: 8,
      },
      Card: {
        borderRadius: 20,
      },
    },
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const currentTheme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [currentTheme]);

  const isDark = currentTheme === "dark";

  return (
    <ConfigProvider theme={getAntdTheme(isDark)}>{children}</ConfigProvider>
  );
}
