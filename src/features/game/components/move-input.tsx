import { useState, useRef, useEffect } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { AlgebraicNotationSchema } from "@/schemas/algebraic-notation";
import { type AlgebraicNotation } from "@/types";
import { generateMoveSuggestions } from "../utils/move-suggestions";

type MoveInputProps = {
  isPlayerTurn: boolean;
  lastMove?: AlgebraicNotation;
  onMove: (move: AlgebraicNotation) => void;
  errorMessage?: string | null;
  onErrorClear?: () => void;
  isThinking: boolean;
  onTakeBack: () => void;
};

export const MoveInput = ({
  isPlayerTurn,
  lastMove,
  onMove,
  errorMessage,
  onErrorClear,
  isThinking,
  onTakeBack,
}: MoveInputProps) => {
  const { t } = useTranslation();
  const [currentMove, setCurrentMove] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isPlayerTurn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    if (errorMessage) {
      setCurrentMove("");
      setSuggestions([]);
      setLocalError(null);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!isPlayerTurn) {
      setCurrentMove("");
      setSuggestions([]);
    }
  }, [isPlayerTurn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = AlgebraicNotationSchema.safeParse(currentMove);
    if (!result.success) {
      setLocalError(t("game.moveInput.invalidNotation"));
      setCurrentMove("");
      setSuggestions([]);
      if (onErrorClear) onErrorClear();
      return;
    }
    if (currentMove && onMove) {
      onMove(currentMove as AlgebraicNotation);
      setCurrentMove("");
      setSuggestions([]);
      setLocalError(null);
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

  const handleTakeBack = () => {
    setShowConfirmDialog(true);
  };

  const confirmTakeBack = () => {
    onTakeBack();
    setShowConfirmDialog(false);
  };

  return (
    <div className="flex flex-col space-y-4 max-w-fit mx-auto">
      <div className="text-center space-y-2">
        {lastMove && (
          <div className="text-chess-gray-700">
            {t("game.status.lastMove")}: {lastMove}
          </div>
        )}
        {currentMove && (
          <div className="text-chess-gray-800 font-medium">
            {t("game.status.currentInput")}: {currentMove}
          </div>
        )}
        <div className="text-chess-gray-600">
          {isPlayerTurn ? t("game.status.yourTurn") : t("game.status.thinking")}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={currentMove}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            disabled={!isPlayerTurn}
            onKeyDown={handleKeyDown}
            placeholder={t("game.status.enterMove")}
            className={`w-64 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-chess-black text-chess-gray-900 ${
              errorMessage || localError
                ? "border-red-500 focus:ring-red-500"
                : "border-chess-gray-300 focus:ring-chess-black"
            }`}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={!!(errorMessage || localError)}
            aria-describedby={
              errorMessage || localError ? "move-error" : undefined
            }
            inputMode="text"
          />
          {(errorMessage || localError) && (
            <div
              id="move-error"
              className="absolute left-0 right-0 mt-1 p-2 bg-red-100 text-red-700 text-sm rounded shadow-lg z-20"
              role="alert"
            >
              {errorMessage || localError}
            </div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 z-50">
              {/* 完全不透明な背景レイヤー */}
              <div
                className="bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full px-3 py-2 text-left text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className={
            showSuggestions && suggestions.length > 0
              ? "opacity-50 pointer-events-none"
              : ""
          }
        >
          <button
            type="submit"
            disabled={!isPlayerTurn || !currentMove}
            className={`w-full px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-md
              ${
                isPlayerTurn && currentMove
                  ? "bg-chess-black text-chess-white hover:bg-chess-gray-800 hover:shadow-lg hover:scale-[1.01]"
                  : "bg-chess-gray-300 text-chess-gray-500 cursor-not-allowed"
              }`}
          >
            {t("game.status.makeMove")}
          </button>
        </form>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleTakeBack}
          disabled={isThinking || !lastMove}
          className="inline-flex items-center px-3 py-2 border border-chess-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-chess-gray-700 bg-chess-white hover:bg-chess-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-chess-gray-100 disabled:cursor-not-allowed"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-chess-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="mx-auto max-w-md rounded-2xl bg-chess-white p-8 shadow-2xl border border-chess-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowUturnLeftIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-chess-gray-900 mb-2">
                {t("game.moveInput.takeBackConfirm.title")}
              </h3>
              <p className="text-chess-gray-600">
                {t("game.moveInput.takeBackConfirm.description")}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-3 text-chess-gray-700 bg-chess-gray-100 hover:bg-chess-gray-200 rounded-xl font-semibold transition-colors duration-200"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={confirmTakeBack}
                className="flex-1 px-4 py-3 bg-red-600 text-chess-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
