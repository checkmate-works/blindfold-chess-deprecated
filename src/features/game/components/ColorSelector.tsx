import { GameSettings, PlayerColor, SKILL_LEVELS } from '@/types/game';

interface ColorSelectorProps {
  onSelect: (settings: GameSettings) => void;
}

const ColorSelector = ({ onSelect }: ColorSelectorProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold text-center mb-6">Game Settings</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Choose Your Color</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => onSelect({ color: 'white', skillLevel: SKILL_LEVELS.INTERMEDIATE })}
                className="py-3 px-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50
                         flex items-center justify-center space-x-2 transition-colors"
              >
                <span className="text-2xl">♔</span>
                <span>Play as White</span>
              </button>

              <button
                onClick={() => onSelect({ color: 'black', skillLevel: SKILL_LEVELS.INTERMEDIATE })}
                className="py-3 px-6 bg-gray-800 text-white border-2 border-gray-800 rounded-lg
                         hover:bg-gray-900 flex items-center justify-center space-x-2 transition-colors"
              >
                <span className="text-2xl">♚</span>
                <span>Play as Black</span>
              </button>

              <button
                onClick={() => onSelect({ color: 'random', skillLevel: SKILL_LEVELS.INTERMEDIATE })}
                className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                         flex items-center justify-center space-x-2 transition-colors"
              >
                <span className="text-2xl">🎲</span>
                <span>Random</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Select AI Level</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => onSelect({ color: 'white', skillLevel: SKILL_LEVELS.BEGINNER })}
                className="py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-50"
              >
                Beginner
              </button>
              <button
                onClick={() => onSelect({ color: 'white', skillLevel: SKILL_LEVELS.INTERMEDIATE })}
                className="py-2 px-4 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Intermediate
              </button>
              <button
                onClick={() => onSelect({ color: 'white', skillLevel: SKILL_LEVELS.EXPERT })}
                className="py-2 px-4 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
              >
                Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;