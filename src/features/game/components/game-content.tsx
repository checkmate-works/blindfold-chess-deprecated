import { Chessboard } from "react-chessboard";
import { MoveInput } from "./move-input";
import { AlgebraicNotation, Side } from "@/types";

type Tab = "move" | "board";

type Props = {
  activeTab: Tab;
  isPlayerTurn: boolean;
  isThinking: boolean;
  lastMove?: AlgebraicNotation;
  currentFen: string;
  playerSide: Side;
  onMove: (move: AlgebraicNotation) => void;
};

export const GameContent = ({
  activeTab,
  isPlayerTurn,
  isThinking,
  lastMove,
  currentFen,
  playerSide,
  onMove,
}: Props) => {
  return (
    <div className="mt-4">
      {activeTab === "move" ? (
        <MoveInput
          isPlayerTurn={isPlayerTurn && !isThinking}
          lastMove={lastMove}
          onMove={onMove}
        />
      ) : (
        <div className="flex justify-center">
          <Chessboard
            position={currentFen}
            boardOrientation={playerSide}
            boardWidth={400}
          />
        </div>
      )}
    </div>
  );
};
