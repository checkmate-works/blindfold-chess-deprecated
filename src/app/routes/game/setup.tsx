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
import { trackGameEvent } from "@/lib/analytics";
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

      // Track game start event
      trackGameEvent.startGame(skillLevel, playerSide);

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
        <div className="max-w-3xl mx-auto p-4 sm:p-6">
          <div className="space-y-10">
            <StartMethodSelector
              selectedMethod={selectedMethod}
              onMethodSelect={setSelectedMethod}
            />

            {selectedMethod === "new" ? (
              <div className="space-y-10">
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
              <div className="space-y-10">
                <PgnInput value={pgn} onChange={setPgn} />
                <SkillLevelSelector
                  selectedLevel={skillLevel}
                  onSelect={setSkillLevel}
                />
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleStartGame}
                disabled={selectedMethod === "pgn" && !pgn}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-chess-gray-900 text-chess-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:bg-chess-gray-800 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                <PlayIcon className="w-6 h-6" />
                {t("common.start")}
              </button>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default GameSetupRoute;
