"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const current = typeof theme === "string" ? theme : "light"
  const isDark = current === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2"
    >
      <Sun className={cn("h-4 w-4 transition-opacity", isDark ? "opacity-50" : "opacity-100")} />
      <Moon className={cn("h-4 w-4 transition-opacity", isDark ? "opacity-100" : "opacity-50")} />
    </Button>
  )
}
