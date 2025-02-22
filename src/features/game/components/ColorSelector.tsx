import { PlayerColor } from '@/types/game';

interface ColorSelectorProps {
  onSelect: (color: PlayerColor) => void;
}

const ColorSelector = ({ onSelect }: ColorSelectorProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold text-center mb-6">Choose Your Color</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onSelect('white')}
            className="py-3 px-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50
                     flex items-center justify-center space-x-2 transition-colors"
          >
            <span className="text-2xl">♔</span>
            <span>Play as White</span>
          </button>

          <button
            onClick={() => onSelect('black')}
            className="py-3 px-6 bg-gray-800 text-white border-2 border-gray-800 rounded-lg
                     hover:bg-gray-900 flex items-center justify-center space-x-2 transition-colors"
          >
            <span className="text-2xl">♚</span>
            <span>Play as Black</span>
          </button>

          <button
            onClick={() => onSelect('random')}
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     flex items-center justify-center space-x-2 transition-colors"
          >
            <span className="text-2xl">🎲</span>
            <span>Random</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;