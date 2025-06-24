import { useTranslation } from "react-i18next";
import { GameStatus } from "@/types";

type Tab = "moveInput" | "board" | "notation";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isPlayerTurn: boolean;
  gameStatus: GameStatus;
};

export const TabMenu = ({ activeTab, onTabChange }: Props) => {
  const { t } = useTranslation();

  const tabs: Tab[] = ["moveInput", "board", "notation"];

  return (
    <div className="border-b border-chess-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab
                  ? "border-chess-black text-chess-black"
                  : "border-transparent text-chess-gray-500 hover:text-chess-gray-700 hover:border-chess-gray-300"
              }
            `}
          >
            {t(`game.tabs.${tab}`)}
          </button>
        ))}
      </nav>
    </div>
  );
};
