import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};
