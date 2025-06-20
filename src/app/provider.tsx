import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { HelmetProvider } from "react-helmet-async";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </HelmetProvider>
  );
};
