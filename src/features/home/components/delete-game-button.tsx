import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

interface DeleteGameButtonProps {
  gameId: string;
  onDelete: (gameId: string) => void;
}

export const DeleteGameButton = ({
  gameId,
  onDelete,
}: DeleteGameButtonProps) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(gameId);
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="p-2 text-chess-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
        aria-label={t("common.delete")}
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-chess-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-chess-white p-8 shadow-2xl border border-chess-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-red-600" />
              </div>
              <Dialog.Title className="text-xl font-bold text-chess-gray-900 mb-2">
                {t("game.deleteConfirm.title")}
              </Dialog.Title>
              <Dialog.Description className="text-chess-gray-600">
                {t("game.deleteConfirm.description")}
              </Dialog.Description>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 px-4 py-3 text-chess-gray-700 bg-chess-gray-100 hover:bg-chess-gray-200 rounded-xl font-semibold transition-colors duration-200"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-chess-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
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
