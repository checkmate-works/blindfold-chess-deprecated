import { useState } from "react";
import { PlayerColor } from "@/types/game";
import MoveInput from "./MoveInput";
import ColorSelector from "./ColorSelector";
import SkillLevelSelector from "./SkillLevelSelector";

interface GameSettingsProps {
  onStartGame: (settings: { color: PlayerColor; skillLevel: number }) => void;
}

const GameSettingScreen = ({ onStartGame }: GameSettingsProps) => {
  const [game, setGame] = useState<StockfishClient | null>(null);
  const [lastMove, setLastMove] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<PlayerColor>("white");
  const [skillLevel, setSkillLevel] = useState<number>(10);

  const handleStartGame = () => {
    const newGame = new StockfishClient();
    newGame.onMove((move) => {
      setLastMove(move);
    });
    setGame(newGame);
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

      {game && <MoveInput lastMove={lastMove} />}
    </div>
  );
};

export default GameSettingScreen;
