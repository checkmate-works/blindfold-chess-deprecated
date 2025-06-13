import { useState, useRef, useEffect } from "react";
import { type AlgebraicNotation } from "@/types";

interface MoveInputProps {
  isPlayerTurn: boolean;
  lastMove?: AlgebraicNotation;
  onMove: (move: AlgebraicNotation) => void;
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPlayerTurn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    if (errorMessage) {
      setCurrentMove("");
      setSuggestions([]);
    }
  }, [errorMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentMove(value);
    setShowSuggestions(true);

    if (errorMessage && onErrorClear) {
      onErrorClear();
    }

    if (!value) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = generateMoveSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const generateMoveSuggestions = (input: string): string[] => {
    if (!input || input.length < 1) return [];

    // キャスリングの入力の場合
    if (input === "O") {
      return ["O-O", "O-O-O"];
    }
    if (input === "O-") {
      return ["O-O", "O-O-O"];
    }
    if (input === "O-O") {
      return ["O-O"];
    }
    if (input === "O-O-") {
      return ["O-O-O"];
    }

    // 駒の種類の入力の場合
    const pieceTypes = ["N", "B", "R", "Q", "K"];
    const firstChar = input[0];

    // 駒の種類のみの入力の場合は何も表示しない
    if (input.length === 1 && pieceTypes.includes(firstChar.toUpperCase())) {
      return [];
    }

    // キングのキャプチャの入力の場合
    if (firstChar === "K" && input.length >= 2) {
      if (input.length === 2 && input[1] === "x") {
        // Kx の場合は何も表示しない
        return [];
      }

      if (input.length === 3 && input[1] === "x") {
        const captureFile = input[2].toLowerCase();
        if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
          return [];

        // 指定されたファイルのすべてのランクを表示
        const moves = Array.from(
          { length: 8 },
          (_, i) => `Kx${captureFile}${i + 1}`,
        );
        return moves;
      }
    }

    // 駒の種類 + ファイルの入力の場合
    if (input.length === 2 && pieceTypes.includes(firstChar.toUpperCase())) {
      const file = input[1].toLowerCase();
      if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(file)) return [];

      // そのファイルの1から8までのランクを返す
      return Array.from({ length: 8 }, (_, i) => `${firstChar}${file}${i + 1}`);
    }

    // キャプチャの入力の場合（例：Bxb2）
    if (input.length >= 2 && pieceTypes.includes(firstChar.toUpperCase())) {
      // Bx の場合は、全てのファイルの1から8までのランクを返す
      if (input.length === 2 && input[1] === "x") {
        return Array.from({ length: 8 }, (_, i) =>
          Array.from(
            { length: 8 },
            (_, j) => `${firstChar}x${String.fromCharCode(97 + i)}${j + 1}`,
          ),
        ).flat();
      }

      // Bxa の場合は、そのファイルの1から8までのランクを返す
      if (input.length === 3 && input[1] === "x") {
        const captureFile = input[2].toLowerCase();
        if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
          return [];
        return Array.from(
          { length: 8 },
          (_, i) => `${firstChar}x${captureFile}${i + 1}`,
        );
      }
    }

    // ポーンの移動とキャプチャの入力の場合
    const fromFile = input[0].toLowerCase();
    if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(fromFile)) return [];

    // 入力が1文字の場合は、そのファイルの全ての移動先を返す
    if (input.length === 1) {
      return Array.from({ length: 8 }, (_, i) => `${fromFile}${i + 1}`);
    }

    // ポーンのキャプチャの入力の場合（例：gxh6）
    if (input.length === 2 && input[1] === "x") {
      const moves: string[] = [];
      const fileIndex = fromFile.charCodeAt(0) - 97;

      // 斜め方向のファイルのみを対象とする（左右1マス）
      const captureFiles = [
        String.fromCharCode(97 + fileIndex - 1), // 左斜め
        String.fromCharCode(97 + fileIndex + 1), // 右斜め
      ].filter((file) => file >= "a" && file <= "h");

      // 各斜め方向のファイルに対して、1から8までのランクを生成
      for (const file of captureFiles) {
        for (let rank = 1; rank <= 8; rank++) {
          moves.push(`${fromFile}x${file}${rank}`);
        }
      }
      return moves;
    }

    if (input.length === 3 && input[1] === "x") {
      const captureFile = input[2].toLowerCase();
      if (!["a", "b", "c", "d", "e", "f", "g", "h"].includes(captureFile))
        return [];

      // 斜め方向のファイルかどうかをチェック
      const fileIndex = fromFile.charCodeAt(0) - 97;
      const captureFileIndex = captureFile.charCodeAt(0) - 97;
      if (Math.abs(fileIndex - captureFileIndex) !== 1) return [];

      return Array.from(
        { length: 8 },
        (_, i) => `${fromFile}x${captureFile}${i + 1}`,
      );
    }

    const fromRank = parseInt(input[1]);
    if (isNaN(fromRank) || fromRank < 1 || fromRank > 8) return [];

    // 入力が2文字の場合は、そのマスからの全ての可能な移動先を返す
    if (input.length === 2) {
      const moves: string[] = [];
      // 同じファイルの移動
      for (let rank = 1; rank <= 8; rank++) {
        if (rank !== fromRank) {
          moves.push(`${fromFile}${rank}`);
        }
      }
      // 同じランクの移動
      for (let file = 0; file < 8; file++) {
        const fileChar = String.fromCharCode(97 + file);
        if (fileChar !== fromFile) {
          moves.push(`${fileChar}${fromRank}`);
        }
      }
      // 斜めの移動
      for (let i = 1; i <= 7; i++) {
        const files = [
          String.fromCharCode(fromFile.charCodeAt(0) + i),
          String.fromCharCode(fromFile.charCodeAt(0) - i),
        ];
        const ranks = [fromRank + i, fromRank - i];

        for (const file of files) {
          if (file >= "a" && file <= "h") {
            for (const rank of ranks) {
              if (rank >= 1 && rank <= 8) {
                moves.push(`${file}${rank}`);
              }
            }
          }
        }
      }
      return moves;
    }

    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMove && onMove) {
      onMove(currentMove as AlgebraicNotation);
      setCurrentMove("");
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMove(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onMove) {
      onMove(suggestion as AlgebraicNotation);
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
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            disabled={!isPlayerTurn}
            onKeyDown={handleKeyDown}
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
            inputMode="text"
            pattern="[a-hA-H0-8xO-]+"
            title="Please enter a valid chess move"
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
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {suggestion}
                </button>
              ))}
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
