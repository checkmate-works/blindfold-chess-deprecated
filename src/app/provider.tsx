import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/language-context";
import { GameServicesProvider } from "@/features/game/providers/game-services.provider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <GameServicesProvider>{children}</GameServicesProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};
