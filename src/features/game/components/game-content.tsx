import { useRef, useEffect, useState, useCallback } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Chessboard } from "react-chessboard";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AlgebraicNotation, Side } from "@/types";
import { generatePgn } from "@/utils/pgn-parser";
import { MoveInput } from "./move-input";

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

  const updateBoardWidth = useCallback(() => {
    if (containerRef.current) {
      const newWidth = Math.min(containerRef.current.offsetWidth, 400);
      // Only update if width actually changed significantly (prevents micro-adjustments)
      if (Math.abs(newWidth - boardWidth) > 5) {
        setIsResizing(true);
        setBoardWidth(newWidth);
        requestAnimationFrame(() => {
          setIsResizing(false);
        });
      }
    }
  }, [boardWidth]);

  // Throttled version for resize events
  const throttledUpdateBoardWidth = useCallback(() => {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateBoardWidth, 16); // ~60fps
    };
  }, [updateBoardWidth])();

  useEffect(() => {
    updateBoardWidth();
    window.addEventListener("resize", throttledUpdateBoardWidth);

    return () => {
      window.removeEventListener("resize", throttledUpdateBoardWidth);
    };
  }, [updateBoardWidth, throttledUpdateBoardWidth]);

  useEffect(() => {
    if (activeTab === "board") {
      requestAnimationFrame(updateBoardWidth);
    }
  }, [activeTab, updateBoardWidth]);

  const handleCopyFen = async () => {
    try {
      await navigator.clipboard.writeText(currentFen);
      toast.success(t("game.fen.copied"));
    } catch (err) {
      console.error("Failed to copy FEN:", err);
      toast.error(t("game.fen.copyFailed"));
    }
  };

  const handleCopyPgn = async () => {
    try {
      const pgn = generatePgn(moves);
      await navigator.clipboard.writeText(pgn);
      toast.success(t("game.pgn.copied"));
    } catch (err) {
      console.error("Failed to copy PGN:", err);
      toast.error(t("game.pgn.copyFailed"));
    }
  };

  const renderNotation = () => {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
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
        <div className="flex justify-end">
          <button
            onClick={handleCopyPgn}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="PGNをコピー"
          >
            <ClipboardDocumentIcon className="w-5 h-5" />
            <span className="text-sm">PGN</span>
          </button>
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
            className="w-full max-w-[400px] aspect-square relative"
            style={{ minWidth: "320px", minHeight: "320px" }}
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
