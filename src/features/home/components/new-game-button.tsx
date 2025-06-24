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
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("game.newGame")}
          </h2>
          <p className="text-gray-600">
            Start a new blindfold chess game against AI
          </p>
        </div>

        <button
          onClick={() => navigate("/game/setup")}
          disabled={isGameLimitReached}
          className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3 ${
            isGameLimitReached
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:scale-[1.02] shadow-lg"
          }`}
        >
          <PlusIcon className="w-6 h-6" />
          <span>
            {isGameLimitReached ? t("game.gameLimitReached") : "Start New Game"}
          </span>
        </button>

        {isGameLimitReached && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <QuestionMarkCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
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
