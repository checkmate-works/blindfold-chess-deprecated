import { useTranslation } from "react-i18next";

type StartMethod = "new" | "pgn";

type Props = {
  selectedMethod: StartMethod;
  onMethodSelect: (method: StartMethod) => void;
};

export const StartMethodSelector = ({
  selectedMethod,
  onMethodSelect,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-chess-gray-900 mb-2">
          {t("game.setup.title")}
        </h2>
        <p className="text-chess-gray-600">
          Choose how you want to start your blindfold chess game
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onMethodSelect("new")}
          className={`group relative px-6 py-4 rounded-xl transition-all duration-200 shadow-sm ${
            selectedMethod === "new"
              ? "bg-chess-gray-900 text-chess-white shadow-lg ring-2 ring-chess-gray-900 ring-offset-2"
              : "bg-chess-white text-chess-gray-700 hover:bg-chess-gray-50 border-2 border-chess-gray-200 hover:border-chess-gray-300 hover:shadow-md"
          }`}
        >
          <div className="text-center">
            <div className="font-semibold text-lg mb-1">
              {t("game.setup.newGame")}
            </div>
            <div className="text-sm opacity-80">
              {t("game.setup.newGameDescription")}
            </div>
          </div>
          {selectedMethod === "new" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-chess-gray-900 rounded-full flex items-center justify-center">
              <span className="text-chess-white text-xs">✓</span>
            </div>
          )}
        </button>
        <button
          onClick={() => onMethodSelect("pgn")}
          className={`group relative px-6 py-4 rounded-xl transition-all duration-200 shadow-sm ${
            selectedMethod === "pgn"
              ? "bg-chess-gray-900 text-chess-white shadow-lg ring-2 ring-chess-gray-900 ring-offset-2"
              : "bg-chess-white text-chess-gray-700 hover:bg-chess-gray-50 border-2 border-chess-gray-200 hover:border-chess-gray-300 hover:shadow-md"
          }`}
        >
          <div className="text-center">
            <div className="font-semibold text-lg mb-1">
              {t("game.setup.startFromPgn")}
            </div>
            <div className="text-sm opacity-80">
              {t("game.setup.startFromPgnDescription")}
            </div>
          </div>
          {selectedMethod === "pgn" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-chess-gray-900 rounded-full flex items-center justify-center">
              <span className="text-chess-white text-xs">✓</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
