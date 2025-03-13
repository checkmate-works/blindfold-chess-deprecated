import { useState } from "react";
import {
  ALL_FILES,
  ALL_RANKS,
  PIECES,
  type AlgebraicNotation,
  type File,
  type PieceSymbol,
} from "@/types";

interface ButtonRowProps {
  symbols: readonly string[];
  onSymbolClick: (symbol: string) => void;
  disabled?: boolean;
}

interface MoveInputProps {
  isPlayerTurn: boolean;
  lastMove?: AlgebraicNotation;
  onMove?: (move: AlgebraicNotation) => void;
}

const ButtonRow = ({ symbols, onSymbolClick, disabled }: ButtonRowProps) => (
  <div className="flex">
    {symbols.map((symbol) => (
      <button
        key={symbol}
        onClick={() => onSymbolClick(symbol)}
        disabled={disabled}
        className={`w-10 h-10 flex items-center justify-center border border-gray-300 
                   ${
                     disabled
                       ? "bg-gray-100 cursor-not-allowed"
                       : "hover:bg-gray-100 active:bg-gray-200"
                   } 
                   transition-colors`}
      >
        {symbol}
      </button>
    ))}
  </div>
);

export const MoveInput = ({
  isPlayerTurn,
  lastMove,
  onMove,
}: MoveInputProps) => {
  const [currentMove, setCurrentMove] = useState<string>("");

  const handleSymbolClick = (symbol: string) => {
    setCurrentMove((prev) => {
      if (prev === "") {
        return symbol;
      }

      // If first character is a piece and clicking the same piece, clear it
      if (
        prev.length === 1 &&
        PIECES.includes(prev as PieceSymbol) &&
        symbol === prev
      ) {
        return "";
      }

      // If first character is a piece and clicking another piece, replace it
      if (
        prev.length === 1 &&
        PIECES.includes(prev as PieceSymbol) &&
        PIECES.includes(symbol as PieceSymbol)
      ) {
        return symbol;
      }

      // If first character is a file and clicking a file, replace it
      if (
        prev.length === 1 &&
        ALL_FILES.includes(prev as File) &&
        ALL_FILES.includes(symbol as File)
      ) {
        return symbol;
      }

      // If second character is a file and clicking a file, replace it
      if (
        prev.length === 2 &&
        ALL_FILES.includes(prev[1] as File) &&
        ALL_FILES.includes(symbol as File)
      ) {
        return prev[0] + symbol;
      }

      // If last character is a rank and clicking a rank, replace it
      if (
        ALL_RANKS.includes(
          Number(prev[prev.length - 1]) as (typeof ALL_RANKS)[number],
        ) &&
        ALL_RANKS.includes(Number(symbol) as (typeof ALL_RANKS)[number])
      ) {
        return prev.slice(0, -1) + symbol;
      }

      // Add character if it follows valid pattern
      if (
        (prev.length === 1 &&
          !PIECES.includes(prev as PieceSymbol) &&
          ALL_RANKS.includes(Number(symbol) as (typeof ALL_RANKS)[number])) || // e4
        (prev.length === 1 &&
          PIECES.includes(prev as PieceSymbol) &&
          ALL_FILES.includes(symbol as File)) || // Nf3
        (prev.length === 2 &&
          PIECES.includes(prev[0] as PieceSymbol) &&
          ALL_FILES.includes(prev[1] as File) &&
          ALL_RANKS.includes(Number(symbol) as (typeof ALL_RANKS)[number])) // Nf3
      ) {
        const newMove = prev + symbol;
        if (isValidMove(newMove)) {
          const moveToSubmit = newMove as AlgebraicNotation;
          setCurrentMove("");
          setTimeout(() => onMove?.(moveToSubmit), 0);
          return "";
        }
        return newMove;
      }

      return prev;
    });
  };

  const isValidMove = (move: string): boolean => {
    return (
      (move.length === 2 &&
        ALL_FILES.includes(move[0] as File) &&
        ALL_RANKS.includes(Number(move[1]) as (typeof ALL_RANKS)[number])) || // e4
      (move.length === 3 &&
        PIECES.includes(move[0] as PieceSymbol) &&
        ALL_FILES.includes(move[1] as File) &&
        ALL_RANKS.includes(Number(move[2]) as (typeof ALL_RANKS)[number])) // Nf3
    );
  };

  return (
    <div className="flex flex-col space-y-4 max-w-fit mx-auto">
      <div className="text-center space-y-2">
        {lastMove && <div className="text-gray-700">Last move: {lastMove}</div>}
        {currentMove && (
          <div className="text-blue-600">Current input: {currentMove}</div>
        )}
        <div className="text-gray-600">
          {isPlayerTurn ? "Your turn" : "Stockfish is thinking..."}
        </div>
      </div>

      <div className="space-y-2">
        <ButtonRow
          symbols={PIECES}
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
        <ButtonRow
          symbols={ALL_FILES}
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
        <ButtonRow
          symbols={ALL_RANKS.map(String)}
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
      </div>
    </div>
  );
};
