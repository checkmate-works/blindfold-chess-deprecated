import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Chess } from "chess.js";
import { SkillLevel } from "@/types";
import { SkillLevelSelector } from "./components/skill-level-selector";
import { ColorSelector } from "./components/color-selector";
import { PgnInput } from "./components/pgn-input";
import { StartMethodSelector } from "./components/start-method-selector";
import { toast } from "react-hot-toast";

type StartMethod = "new" | "pgn";

const decidePlayerSide = (
  color: "white" | "black" | "random",
): "white" | "black" => {
  if (color === "random") {
    return Math.random() < 0.5 ? "white" : "black";
  }
  return color;
};

export const GameSetting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<StartMethod>("new");
  const [selectedColor, setSelectedColor] = useState<
    "white" | "black" | "random"
  >("white");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(10);
  const [pgn, setPgn] = useState("");

  const handleStartGame = () => {
    if (selectedMethod === "pgn" && pgn) {
      try {
        const chess = new Chess();
        chess.loadPgn(pgn);
        const moves = chess.history({ verbose: false });
        const playerSide = moves.length % 2 === 0 ? "white" : "black";
        const settings = {
          color: playerSide,
          skillLevel,
        };
        navigate("/game/play", {
          state: {
            settings,
            initialMoves: moves,
          },
        });
      } catch {
        toast.error(t("game.pgnInput.invalid"));
        return;
      }
    } else {
      const playerSide = decidePlayerSide(selectedColor);
      const settings = {
        color: playerSide,
        skillLevel,
      };
      navigate("/game/play", {
        state: {
          settings,
          initialMoves: [],
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <StartMethodSelector
        selectedMethod={selectedMethod}
        onMethodSelect={setSelectedMethod}
      />

      {selectedMethod === "new" ? (
        <div className="space-y-8">
          <ColorSelector
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
          <SkillLevelSelector
            selectedLevel={skillLevel}
            onSelect={setSkillLevel}
          />
        </div>
      ) : (
        <div className="space-y-8">
          <PgnInput value={pgn} onChange={setPgn} onSubmit={handleStartGame} />
          <SkillLevelSelector
            selectedLevel={skillLevel}
            onSelect={setSkillLevel}
          />
        </div>
      )}

      <button
        onClick={handleStartGame}
        disabled={selectedMethod === "pgn" && !pgn}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlayIcon className="w-5 h-5" />
        {t("common.start")}
      </button>
    </div>
  );
};
