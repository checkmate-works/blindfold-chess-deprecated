type Tab = "move" | "board";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export const TabMenu = ({ activeTab, onTabChange }: Props) => {
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
            Enter Move
          </button>
          <button
            onClick={() => onTabChange("board")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "board"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            View Board
          </button>
        </nav>
      </div>
    </div>
  );
};
