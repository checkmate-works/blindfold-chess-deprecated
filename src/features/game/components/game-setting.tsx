import { useState } from "react";
import { PlayerColor } from "@/types";
import { ColorSelector } from "./color-selector";
import { SkillLevelSelector } from "./skill-level-selector";

type GameSettingsProps = {
  onStartGame: (settings: { color: PlayerColor; skillLevel: number }) => void;
};

export const GameSetting = ({ onStartGame }: GameSettingsProps) => {
  const [selectedColor, setSelectedColor] = useState<PlayerColor>("white");
  const [skillLevel, setSkillLevel] = useState<number>(10);

  const handleStartGame = () => {
    onStartGame({ color: selectedColor, skillLevel });
  };

  return (
    <div className="space-y-6 p-4">
      <ColorSelector
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />

      <SkillLevelSelector
        selectedLevel={skillLevel}
        onLevelSelect={setSkillLevel}
      />

      <button
        onClick={handleStartGame}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>
  );
};
