const PIECES = ['K', 'Q', 'R', 'B', 'N'];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

const ButtonRow = ({ symbols }: { symbols: string[] }) => (
  <div className="flex">
    {symbols.map((symbol) => (
      <button
        key={symbol}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 
                 hover:bg-gray-100 active:bg-gray-200 transition-colors"
      >
        {symbol}
      </button>
    ))}
  </div>
);

const MoveInput = () => {
  return (
    <div className="flex flex-col space-y-1 max-w-fit mx-auto">
      <ButtonRow symbols={PIECES} />
      <ButtonRow symbols={FILES} />
      <ButtonRow symbols={RANKS} />
    </div>
  );
};

export default MoveInput; 