"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        {theme === "light" ? <Sun /> : <Moon />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-100 rounded-box z-1 w-24 p-2 border border-base-300"
      >
        <li>
          <a onClick={() => setTheme("system")}>System</a>
        </li>
        <li>
          <a onClick={() => setTheme("light")}>Light</a>
        </li>
        <li>
          <a onClick={() => setTheme("dark")}>Dark</a>
        </li>
      </ul>
    </div>
  );
}
