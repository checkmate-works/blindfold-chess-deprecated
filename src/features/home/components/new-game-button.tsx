import { PlusIcon } from "@heroicons/react/24/outline";
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
    <button
      onClick={() => navigate("/game/setup")}
      disabled={isGameLimitReached}
      className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-md ${
        isGameLimitReached
          ? "bg-chess-gray-100 text-chess-gray-400 cursor-not-allowed"
          : "bg-chess-black text-chess-white hover:bg-chess-gray-700 hover:shadow-lg hover:scale-[1.02]"
      }`}
    >
      <PlusIcon className="w-6 h-6" />
      <span>
        {isGameLimitReached ? t("game.gameLimitReached") : t("game.newGame")}
      </span>
    </button>
  );
};
