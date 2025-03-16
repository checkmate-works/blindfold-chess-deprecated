import { Game } from "@/types";

interface GameListProps {
  games: Game[];
}

export const GameList = ({ games }: GameListProps) => {
  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p className="text-center">
          No games yet. Start playing to see your games here!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="divide-y divide-gray-200">
        {games.map((game) => (
          <li key={game.id} className="py-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {new Date(game.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-600">
                  Playing as {game.playerColor}
                </span>
                {game.result && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.result === "win"
                        ? "bg-green-100 text-green-800"
                        : game.result === "loss"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {game.result.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="text-sm text-gray-600">
                  {game.moves.length} moves
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
