import { useState } from 'react';
import { PlayerColor } from '@/types/game';
import MoveInput from '../components/MoveInput';
import ColorSelector from '../components/ColorSelector';

type ColorSelectionState = PlayerColor | 'selecting';

const Game = () => {
  const [gameState, setGameState] = useState<ColorSelectionState>('selecting');

  const handleColorSelect = (color: PlayerColor) => {
    if (color === 'random') {
      setGameState(Math.random() < 0.5 ? 'white' : 'black');
    } else {
      setGameState(color);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Play Blindfold Chess</h1>
      <div className="max-w-2xl mx-auto">
        {gameState === 'selecting' && <ColorSelector onSelect={handleColorSelect} />}
        
        {gameState !== 'selecting' && (
          <div className="text-center mb-6">
            Playing as: {gameState === 'white' ? '♔ White' : '♚ Black'}
          </div>
        )}

        <div className="mt-8">
          <MoveInput />
        </div>
      </div>
    </div>
  );
};

export default Game; 