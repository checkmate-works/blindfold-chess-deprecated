import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SYSTEM_CONSTANTS } from "@/lib/constants";

interface Props {
  gameCount: number;
}

export const NewGameButton = ({ gameCount }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isGameLimitReached = gameCount >= SYSTEM_CONSTANTS.MAX_SAVED_GAMES;

  return (
    <div className="space-y-4">
      <div className="bg-chess-white rounded-2xl shadow-md border border-chess-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-chess-gray-800 mb-2">
            {t("game.newGame")}
          </h2>
          <p className="text-chess-gray-600">
            Start a new blindfold chess game against AI
          </p>
        </div>

        <button
          onClick={() => navigate("/game/setup")}
          disabled={isGameLimitReached}
          className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
            isGameLimitReached
              ? "bg-chess-gray-100 text-chess-gray-400 cursor-not-allowed"
              : "bg-chess-black text-chess-white hover:bg-chess-gray-700 hover:shadow-lg hover:scale-[1.01] shadow-md"
          }`}
        >
          <PlusIcon className="w-6 h-6" />
          <span>
            {isGameLimitReached ? t("game.gameLimitReached") : "Start New Game"}
          </span>
        </button>

        {isGameLimitReached && (
          <div className="mt-4 p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl">
            <div className="flex items-start space-x-3">
              <QuestionMarkCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-700">
                <p className="font-medium mb-1">Game limit reached</p>
                <p>
                  You can have up to {SYSTEM_CONSTANTS.MAX_SAVED_GAMES} saved
                  games. Delete some games to create new ones.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
