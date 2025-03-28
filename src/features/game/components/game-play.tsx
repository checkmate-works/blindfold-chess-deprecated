import { GameSettings, AlgebraicNotation } from "@/types";
import { TabMenu } from "./tab-menu";
import { GameHeader } from "./game-header";
import { GameContent } from "./game-content";
import { useGamePlay } from "../hooks/use-game-play";

type Props = {
  settings: GameSettings;
  savedMoves?: AlgebraicNotation[];
};

export const GamePlay = ({ settings, savedMoves }: Props) => {
  const {
    activeTab,
    setActiveTab,
    errorMessage,
    isThinking,
    gameState,
    displayColor,
    currentFen,
    handleMove,
    handleSave,
  } = useGamePlay(settings, savedMoves);

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="max-w-2xl mx-auto p-4">
        <GameHeader
          displayColor={displayColor}
          skillLevel={settings.skillLevel}
          errorMessage={errorMessage}
        />

        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

        <GameContent
          activeTab={activeTab}
          isPlayerTurn={gameState.isPlayerTurn}
          isThinking={isThinking}
          lastMove={gameState.moves[gameState.moves.length - 1]}
          currentFen={currentFen}
          displayColor={displayColor}
          onMove={handleMove}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={handleSave}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200"
            disabled={gameState.moves.length === 0}
          >
            Save Game
          </button>
        </div>
      </div>
    </div>
  );
};
