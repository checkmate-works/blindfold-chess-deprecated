import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerColor, Side, SkillLevel } from "@/types";
import { ColorSelector } from "./components/color-selector";
import { SkillLevelSelector } from "./components/skill-level-selector";
import { useTranslation } from "react-i18next";
import { PlayIcon } from "@heroicons/react/24/outline";

const decidePlayerSide = (colorSetting: PlayerColor): Side => {
  if (colorSetting === "random") {
    return Math.random() < 0.5 ? "white" : "black";
  }
  return colorSetting;
};

export const GameSetting = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<PlayerColor>("white");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(10);
  const { t } = useTranslation();

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
    <div className="min-h-screen pb-20">
      <div className="container mx-auto p-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="space-y-6">
            <ColorSelector
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            <SkillLevelSelector
              selectedLevel={skillLevel}
              onLevelSelect={setSkillLevel}
            />
          </div>

          <button
            onClick={handleStartGame}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-sm border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <PlayIcon className="w-5 h-5" />
            <span>{t("game.start")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
