import { ReactNode, useMemo } from "react";
import { GameServicesContext, createGameServices } from "../services";
import { SkillLevel } from "@/types";

type GameServicesProviderProps = {
  children: ReactNode;
  skillLevel?: SkillLevel;
};

export const GameServicesProvider = ({
  children,
  skillLevel = 20,
}: GameServicesProviderProps) => {
  const services = useMemo(() => createGameServices(skillLevel), [skillLevel]);

  return (
    <GameServicesContext.Provider value={services}>
      {children}
    </GameServicesContext.Provider>
  );
};
