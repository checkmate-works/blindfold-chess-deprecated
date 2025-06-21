import { Chessboard } from "react-chessboard";
import { MoveInput } from "./move-input";
import { AlgebraicNotation, Side } from "@/types";
import { useRef, useEffect, useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

type Tab = "moveInput" | "board" | "notation";

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
  onTakeBack: () => void;
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
  onTakeBack,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const { t } = useTranslation();

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

  const handleCopyFen = async () => {
    try {
      await navigator.clipboard.writeText(currentFen);
      toast.success(t("game.fen.copied"));
    } catch (err) {
      console.error("Failed to copy FEN:", err);
      toast.error(t("game.fen.copyFailed"));
    }
  };

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
      {activeTab === "moveInput" ? (
        <MoveInput
          isPlayerTurn={isPlayerTurn && !isThinking}
          lastMove={lastMove}
          onMove={onMove}
          errorMessage={errorMessage}
          onErrorClear={onErrorClear}
          isThinking={isThinking}
          onTakeBack={onTakeBack}
        />
      ) : activeTab === "board" ? (
        <div className="flex flex-col items-center w-full space-y-4">
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
          <div className="w-full max-w-[400px] flex items-center space-x-2">
            <input
              type="text"
              value={currentFen}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
            />
            <button
              onClick={handleCopyFen}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="FENをコピー"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        renderNotation()
      )}
    </div>
  );
};
