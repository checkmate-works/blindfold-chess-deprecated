import { useState, useRef, useEffect } from "react";
import { type AlgebraicNotation } from "@/types";

interface MoveInputProps {
  isPlayerTurn: boolean;
  lastMove?: AlgebraicNotation;
  onMove?: (move: AlgebraicNotation) => void;
  errorMessage?: string | null;
  onErrorClear?: () => void;
}

export const MoveInput = ({
  isPlayerTurn,
  lastMove,
  onMove,
  errorMessage,
  onErrorClear,
}: MoveInputProps) => {
  const [currentMove, setCurrentMove] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPlayerTurn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlayerTurn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMove && onMove) {
      onMove(currentMove as AlgebraicNotation);
      setCurrentMove("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMove(e.target.value);
    if (errorMessage && onErrorClear) {
      onErrorClear();
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-fit mx-auto">
      <div className="text-center space-y-2">
        {lastMove && <div className="text-gray-700">Last move: {lastMove}</div>}
        {currentMove && (
          <div className="text-gray-800 font-medium">
            Current input: {currentMove}
          </div>
        )}
        <div className="text-gray-600">
          {isPlayerTurn ? "Your turn" : "Stockfish is thinking..."}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={currentMove}
            onChange={handleChange}
            disabled={!isPlayerTurn}
            placeholder="Enter move (e.g. e4, Nf3, O-O, Bxc6)"
            className={`w-64 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 ${
              errorMessage
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black"
            }`}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? "move-error" : undefined}
          />
          {errorMessage && (
            <div
              id="move-error"
              className="absolute left-0 right-0 mt-1 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg z-10"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!isPlayerTurn || !currentMove}
          className={`w-full px-4 py-2 text-white rounded transition
            ${
              isPlayerTurn && currentMove
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Make Move
        </button>
      </form>
    </div>
  );
};
