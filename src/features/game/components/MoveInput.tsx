import { useState } from 'react';

const PIECES = ['K', 'Q', 'R', 'B', 'N'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface ButtonRowProps {
  symbols: string[];
  onSymbolClick: (symbol: string) => void;
  disabled?: boolean;
}

const ButtonRow = ({ symbols, onSymbolClick, disabled }: ButtonRowProps) => (
  <div className="flex">
    {symbols.map((symbol) => (
      <button
        key={symbol}
        onClick={() => onSymbolClick(symbol)}
        disabled={disabled}
        className={`w-10 h-10 flex items-center justify-center border border-gray-300 
                   ${disabled 
                     ? 'bg-gray-100 cursor-not-allowed' 
                     : 'hover:bg-gray-100 active:bg-gray-200'} 
                   transition-colors`}
      >
        {symbol}
      </button>
    ))}
  </div>
);

interface MoveInputProps {
  isPlayerTurn: boolean;
  lastMove?: string;
  onMove?: (move: string) => void;
}

const MoveInput = ({ isPlayerTurn, lastMove, onMove }: MoveInputProps) => {
  const [currentMove, setCurrentMove] = useState<string>('');

  const handleSymbolClick = (symbol: string) => {
    setCurrentMove(prev => {
      const newMove = prev + symbol;
      
      // If we have a complete move (e.g., "e4" or "Nf3")
      if (
        (newMove.length === 2 && !PIECES.includes(newMove[0])) || // Pawn move
        (newMove.length === 3 && PIECES.includes(newMove[0]))     // Piece move
      ) {
        onMove?.(newMove);
        return '';
      }
      
      return newMove;
    });
  };

  return (
    <div className="flex flex-col space-y-4 max-w-fit mx-auto">
      <div className="text-center space-y-2">
        {lastMove && (
          <div className="text-gray-700">
            Last move: {lastMove}
          </div>
        )}
        {currentMove && (
          <div className="text-blue-600">
            Current input: {currentMove}
          </div>
        )}
        <div className="text-gray-600">
          {isPlayerTurn ? "Your turn" : "Stockfish is thinking..."}
        </div>
      </div>

      <div className="space-y-2">
        <ButtonRow 
          symbols={PIECES} 
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
        <ButtonRow 
          symbols={FILES} 
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
        <ButtonRow 
          symbols={RANKS} 
          onSymbolClick={handleSymbolClick}
          disabled={!isPlayerTurn}
        />
      </div>
    </div>
  );
};

export default MoveInput; 