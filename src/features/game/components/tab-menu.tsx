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
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
