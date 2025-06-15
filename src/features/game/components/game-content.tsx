import { Chessboard } from "react-chessboard";
import { MoveInput } from "./move-input";
import { AlgebraicNotation, Side } from "@/types";
import { useRef, useEffect, useState } from "react";

type Tab = "move" | "board" | "notation";

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
  const [isResizing, setIsResizing] = useState(false);

  const updateBoardWidth = () => {
    if (containerRef.current) {
      setIsResizing(true);
      const width = containerRef.current.offsetWidth;
      setBoardWidth(width);
      // リサイズ完了後に少し遅延を入れてから表示する
      requestAnimationFrame(() => {
        setIsResizing(false);
      });
    }
  };

  useEffect(() => {
    updateBoardWidth();
    window.addEventListener("resize", updateBoardWidth);

    return () => {
      window.removeEventListener("resize", updateBoardWidth);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "board") {
      requestAnimationFrame(updateBoardWidth);
    }
  }, [activeTab]);

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
      ) : activeTab === "board" ? (
        <div className="flex justify-center w-full">
          <div
            ref={containerRef}
            className="w-full max-w-[400px] aspect-square"
          >
            {!isResizing && (
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
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          TODO: Implement notation view
        </div>
      )}
    </div>
  );
};
