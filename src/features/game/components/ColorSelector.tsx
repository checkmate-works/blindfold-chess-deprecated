import { PlayerColor } from '@/types/game';

interface ColorSelectorProps {
  selectedColor: PlayerColor;
  onColorSelect: (color: PlayerColor) => void;
}

const ColorSelector = ({ selectedColor, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Choose Your Color</h3>
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => onColorSelect('white')}
          className={`py-3 px-6 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors
            ${selectedColor === 'white' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:bg-gray-50'}`}
        >
          <span className="text-2xl">♔</span>
          <span>Play as White</span>
        </button>

        <button
          onClick={() => onColorSelect('black')}
          className={`py-3 px-6 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors
            ${selectedColor === 'black'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:bg-gray-50'}`}
        >
          <span className="text-2xl">♚</span>
          <span>Play as Black</span>
        </button>

        <button
          onClick={() => onColorSelect('random')}
          className={`py-3 px-6 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors
            ${selectedColor === 'random'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:bg-gray-50'}`}
        >
          <span className="text-2xl">🎲</span>
          <span>Random</span>
        </button>
      </div>
    </div>
  );
};

export default ColorSelector;