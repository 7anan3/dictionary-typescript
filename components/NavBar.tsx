import Dictionary from "./icons/Dictionary";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
import { useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { useDarkModeFont } from "@/context/dark-mode-font-context";

export default function NavBar() {
  const { isDarkMode, setIsDarkMode, selectedFont, setSelectedFont } =
    useDarkModeFont();

  //Handle font selection
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
  };

  // Toggle dark / light mode + Localstorage
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, [setIsDarkMode]);

  return (
    <section className="dark:bg-midnight-black">
      <nav className="flex py-5 justify-between ">
        <Link href="/">
          <Dictionary className="stroke-medium-gray w-8 shrink-0" />
        </Link>
        <div className="flex items-center">
          <select
            value={selectedFont}
            onChange={handleSelect}
            className="dark:bg-midnight-black dark:text-white border-none w-36"
          >
            <option value="">--Choose a font--</option>
            <option value="font-serif">Serif</option>
            <option value="font-sans">Sans</option>
            <option value="font-mono">Mono</option>
          </select>
          <span className="border-l mx-2.5"></span>

          <a role="button" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun color="white" /> : <Moon className="w-6" />}
          </a>
        </div>
      </nav>
    </section>
  );
}
