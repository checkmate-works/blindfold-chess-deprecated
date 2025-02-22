import MoveInput from '../components/MoveInput';

const Game = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Play Blindfold Chess</h1>
      <div className="max-w-2xl mx-auto">
        {/* Game state will go here */}
        <div className="mt-8">
          <MoveInput />
        </div>
      </div>
    </div>
  );
};

export default Game; 