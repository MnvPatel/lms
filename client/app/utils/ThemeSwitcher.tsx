import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
useEffect(() => {
    setMounted(true);
    // setTheme('dark'); // or 'light'
}, []);

if (!mounted) return null;


  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer text-black dark:text-white"
          size={25}
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark mode"
        />
      ) : (
        <BiSun
          className="cursor-pointer text-black dark:text-white"
          size={25}
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
        />
      )}
    </div>
  );
};
