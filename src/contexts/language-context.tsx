import { createContext, useState, ReactNode, useContext } from "react";
import { useTranslation } from "react-i18next";

export type Language = "en" | "ja";

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem("language") as Language) || "en",
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
