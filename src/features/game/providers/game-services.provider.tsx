import { ReactNode, useMemo } from "react";
import { SkillLevel } from "@/types";
import { GameServicesContext, createGameServices } from "../services";

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
