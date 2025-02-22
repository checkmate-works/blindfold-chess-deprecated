import { useState } from 'react';
import { GameSettings, PlayerColor } from '@/types/game';
import MoveInput from '../components/MoveInput';
import ColorSelector from '../components/ColorSelector';

type GameState = { status: 'selecting' } | (GameSettings & { status: 'playing' });

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({ status: 'selecting' });

  const handleGameSettings = (settings: GameSettings) => {
    const finalColor = settings.color === 'random' 
      ? (Math.random() < 0.5 ? 'white' : 'black')
      : settings.color;

    setGameState({
      status: 'playing',
      color: finalColor,
      skillLevel: settings.skillLevel
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Play Blindfold Chess</h1>
      <div className="max-w-2xl mx-auto">
        {gameState.status === 'selecting' && (
          <ColorSelector onSelect={handleGameSettings} />
        )}
        
        {gameState.status === 'playing' && (
          <>
            <div className="text-center mb-6">
              <div>Playing as: {gameState.color === 'white' ? '♔ White' : '♚ Black'}</div>
              <div className="text-sm text-gray-600">AI Level: {gameState.skillLevel}</div>
            </div>
            <div className="mt-8">
              <MoveInput />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Game; 