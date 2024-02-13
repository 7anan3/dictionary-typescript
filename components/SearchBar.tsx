import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDarkModeFont } from "@/context/dark-mode-font-context";

interface SearChBarState {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchInput,
  setSearchInput,
}: SearChBarState) {
  const { selectedFont } = useDarkModeFont();
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/${searchInput.trim()}`);
  };
  return (
    <div className="flex relative">
      <input
        type="text"
        placeholder="Type your search word"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={`bg-light-gray focus:outline-pale-purple w-full py-1.5 pl-3 rounded-lg text-midnight-black font-bold placeholder:font-normal ${selectedFont}`}
      />
      <Image
        src="./search-icon.svg"
        alt="search icon"
        width="20"
        height="20"
        className="absolute right-1 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
}
