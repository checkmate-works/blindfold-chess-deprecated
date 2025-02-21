import { useEffect, useState } from 'react';
import GameList from './GameList';
import { Game } from '../types';

const TopPage = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const storedGames = localStorage.getItem('blindfoldChessGames');
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Blindfold Chess</h1>
        <GameList games={games} />
      </div>
    </div>
  );
};

export default TopPage;
