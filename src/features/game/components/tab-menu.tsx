import { useTranslation } from "react-i18next";
import { GameStatus } from "@/types";

type Tab = "move" | "board" | "notation";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isPlayerTurn: boolean;
  gameStatus: GameStatus;
};

export const TabMenu = ({ activeTab, onTabChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <button
            onClick={() => onTabChange("move")}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "move"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {t("game.tabs.move")}
          </button>
          <button
            onClick={() => onTabChange("board")}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "board"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {t("game.tabs.board")}
          </button>
          <button
            onClick={() => onTabChange("notation")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notation"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {t("game.tabs.notation")}
          </button>
        </nav>
      </div>
    </div>
  );
};
