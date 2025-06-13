import { Chessboard } from "react-chessboard";
import { MoveInput } from "./move-input";
import { AlgebraicNotation, Side } from "@/types";
import { useRef, useEffect, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(400);

  useEffect(() => {
    const updateBoardWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setBoardWidth(width);
      }
    };

    updateBoardWidth();
    window.addEventListener("resize", updateBoardWidth);

    return () => {
      window.removeEventListener("resize", updateBoardWidth);
    };
  }, []);

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
        <div className="flex justify-center w-full">
          <div
            ref={containerRef}
            className="w-full max-w-[400px] aspect-square"
          >
            <Chessboard
              position={currentFen}
              boardOrientation={playerSide}
              boardWidth={boardWidth}
              arePiecesDraggable={false}
              areArrowsAllowed={false}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
