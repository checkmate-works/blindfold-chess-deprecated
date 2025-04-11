import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerColor, Side } from "@/types";
import { ColorSelector } from "./color-selector";
import { SkillLevelSelector } from "./skill-level-selector";

const decidePlayerSide = (colorSetting: PlayerColor): Side => {
  if (colorSetting === "random") {
    return Math.random() < 0.5 ? "white" : "black";
  }
  return colorSetting;
};

export const GameSetting = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<PlayerColor>("white");
  const [skillLevel, setSkillLevel] = useState<number>(10);

  const handleStartGame = () => {
    navigate("/game/play", {
      state: {
        settings: {
          color: decidePlayerSide(selectedColor),
          skillLevel,
        },
      },
    });
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="space-y-6 p-4 max-w-2xl mx-auto">
        <ColorSelector
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        <SkillLevelSelector
          selectedLevel={skillLevel}
          onLevelSelect={setSkillLevel}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={handleStartGame}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};
