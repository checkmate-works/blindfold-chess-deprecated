import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Chess } from "chess.js";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "@/components/layouts";
import { ColorSelector } from "@/features/game/components/color-selector";
import { PgnInput } from "@/features/game/components/pgn-input";
import { SkillLevelSelector } from "@/features/game/components/skill-level-selector";
import { StartMethodSelector } from "@/features/game/components/start-method-selector";
import { useGameServices } from "@/features/game/services";
import { SkillLevel, AlgebraicNotation } from "@/types";

type StartMethod = "new" | "pgn";

const decidePlayerSide = (
  color: "white" | "black" | "random",
): "white" | "black" => {
  if (color === "random") {
    return Math.random() < 0.5 ? "white" : "black";
  }
  return color;
};

const GameSetupRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { gameRepository } = useGameServices();
  const [selectedMethod, setSelectedMethod] = useState<StartMethod>("new");
  const [selectedColor, setSelectedColor] = useState<
    "white" | "black" | "random"
  >("white");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(10);
  const [pgn, setPgn] = useState("");

  const handleStartGame = async () => {
    if (selectedMethod === "pgn" && pgn) {
      try {
        const chess = new Chess();
        chess.loadPgn(pgn);
        const moves = chess.history({ verbose: false }) as AlgebraicNotation[];
        const playerSide = moves.length % 2 === 0 ? "white" : "black";
        const settings = {
          color: playerSide,
          skillLevel,
        };
        const gameId = await gameRepository.save({
          moves,
          playerColor: playerSide,
          skillLevel,
          status: "in_progress",
        });
        navigate("/game/play", {
          state: {
            settings,
            initialMoves: moves,
            gameId,
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
    <>
      <Helmet>
        <title>{t("app.title")}</title>
      </Helmet>
      <ContentLayout>
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
              <PgnInput value={pgn} onChange={setPgn} />
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
      </ContentLayout>
    </>
  );
};

export default GameSetupRoute;
