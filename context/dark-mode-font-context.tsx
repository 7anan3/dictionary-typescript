import { createContext, useContext, useState, ReactNode } from "react";

const DarkModeFontContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFont: string;
  setSelectedFont: React.Dispatch<React.SetStateAction<string>>;
}>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  selectedFont: "",
  setSelectedFont: () => {},
});

interface DarkModeFontProviderProps {
  children: ReactNode;
}

export function DarkModeFontProvider({ children }: DarkModeFontProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFont, setSelectedFont] = useState("font-serif");

  return (
    <DarkModeFontContext.Provider
      value={{ isDarkMode, setIsDarkMode, selectedFont, setSelectedFont }}
    >
      {children}
    </DarkModeFontContext.Provider>
  );
}

export function useDarkModeFont() {
  const context = useContext(DarkModeFontContext);

  if (!context)
    throw Error(
      "useDarkModeFont hook should be used inside DarkModeFontProvider"
    );

  return context;
}
