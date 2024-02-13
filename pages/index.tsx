import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import { useDarkModeFont } from "@/context/dark-mode-font-context";
import { useState } from "react";

export default function HomePage() {
  const { isDarkMode } = useDarkModeFont();
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={`${isDarkMode ? "dark bg-midnight-black" : ""} h-screen`}>
      <div className="px-6 md:px-20 lg:w-4/6 lg:m-auto">
        <NavBar />
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
    </div>
  );
}
