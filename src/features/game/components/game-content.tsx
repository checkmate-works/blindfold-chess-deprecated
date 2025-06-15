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
  moves: AlgebraicNotation[];
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
  moves,
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

  const renderNotation = () => {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-2 gap-4">
            {moves.map((move, index) => {
              const moveNumber = Math.floor(index / 2) + 1;
              const isWhiteMove = index % 2 === 0;
              return (
                <div key={index} className="flex items-center space-x-2">
                  {isWhiteMove && (
                    <span className="text-gray-500 w-8">{moveNumber}.</span>
                  )}
                  <span className={`font-mono ${isWhiteMove ? "ml-8" : ""}`}>
                    {move}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

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
        renderNotation()
      )}
    </div>
  );
};
