import { useState, useRef, useEffect } from "react";
import { type AlgebraicNotation } from "@/types";
import { generateMoveSuggestions } from "@/utils/move-suggestions";
import { useTranslation } from "react-i18next";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

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

  useEffect(() => {
    if (!isPlayerTurn) {
      setCurrentMove("");
      setSuggestions([]);
    }
  }, [isPlayerTurn]);

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
          <div className="text-gray-700">
            {t("game.status.lastMove")}: {lastMove}
          </div>
        )}
        {currentMove && (
          <div className="text-gray-800 font-medium">
            {t("game.status.currentInput")}: {currentMove}
          </div>
        )}
        <div className="text-gray-600">
          {isPlayerTurn ? t("game.status.yourTurn") : t("game.status.thinking")}
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
            placeholder={t("game.status.enterMove")}
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
          {t("game.status.makeMove")}
        </button>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleTakeBack}
          disabled={isThinking || !lastMove}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t("game.moveInput.takeBackConfirm.title")}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {t("game.moveInput.takeBackConfirm.description")}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={confirmTakeBack}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
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
