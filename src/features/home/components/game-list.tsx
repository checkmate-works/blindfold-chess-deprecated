import { Game } from "@/types";
import { useNavigate } from "react-router-dom";
import { PlayScreenState } from "@/routes/app/game/play";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ja, enUS } from "date-fns/locale";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

interface Props {
  games: Game[];
  onDeleteGame: (gameId: string) => void;
}

const ColorIcon = ({ color }: { color: "white" | "black" }) => (
  <div
    className={`w-4 h-4 rounded-full ${
      color === "white" ? "bg-white border border-gray-400" : "bg-gray-900"
    }`}
  />
);

export const GameList = ({ games, onDeleteGame }: Props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    const locale = i18n.language === "ja" ? ja : enUS;
    return format(date, "yyyy/MM/dd HH:mm", { locale });
  };

  const handleGameClick = (game: Game) => {
    navigate("/game/play", {
      state: {
        settings: {
          color: game.playerColor,
          skillLevel: game.skillLevel,
        },
        initialMoves: game.moves,
        gameId: game.id,
      } satisfies PlayScreenState,
    });
  };

  const handleDeleteClick = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setGameToDelete(gameId);
  };

  const handleConfirmDelete = () => {
    if (gameToDelete) {
      onDeleteGame(gameToDelete);
      setGameToDelete(null);
    }
  };

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p className="text-center">{t("game.list.noGames")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <ul className="divide-y divide-gray-200">
          {games.map((game) => (
            <li
              key={game.id}
              className="py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {formatDate(new Date(game.date))}
                  </span>
                  <ColorIcon color={game.playerColor} />
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.status === "win"
                        ? "bg-green-100 text-green-800"
                        : game.status === "loss"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(`game.list.status.${game.status}`)}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="text-sm text-gray-600">
                    {game.moves.length} {t("game.list.moves")}
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeleteClick(e, game.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        open={gameToDelete !== null}
        onClose={() => setGameToDelete(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              {t("game.deleteConfirm.title")}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              {t("game.deleteConfirm.description")}
            </Dialog.Description>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setGameToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t("common.delete")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
