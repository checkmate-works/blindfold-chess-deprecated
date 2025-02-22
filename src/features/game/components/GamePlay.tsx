import { GameSettings } from '@/types/game';
import MoveInput from './MoveInput';

interface GamePlayProps {
  settings: GameSettings;
}

const GamePlay = ({ settings }: GamePlayProps) => {
  const displayColor = settings.color === 'random' 
    ? (Math.random() < 0.5 ? 'white' : 'black')
    : settings.color;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <div>Playing as: {displayColor === 'white' ? '♔ White' : '♚ Black'}</div>
        <div className="text-sm text-gray-600">AI Level: {settings.skillLevel}</div>
      </div>
      
      <div className="mt-8">
        <MoveInput />
      </div>
    </div>
  );
};

export default GamePlay; 