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
  errorMessage: string | null;
  onErrorClear: () => void;
};

export const GameContent = ({
  activeTab,
  isPlayerTurn,
  isThinking,
  lastMove,
  currentFen,
  playerSide,
  onMove,
  errorMessage,
  onErrorClear,
}: Props) => {
  return (
    <div className="mt-4">
      {activeTab === "move" ? (
        <MoveInput
          isPlayerTurn={isPlayerTurn && !isThinking}
          lastMove={lastMove}
          onMove={onMove}
          errorMessage={errorMessage}
          onErrorClear={onErrorClear}
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
