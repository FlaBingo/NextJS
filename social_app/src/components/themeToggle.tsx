"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem]  w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only bg-amber-200">Toggle Theme</span>
      </Button>
    </>
  );
};
