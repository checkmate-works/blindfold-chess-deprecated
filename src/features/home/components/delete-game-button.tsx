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
        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
        aria-label={t("common.delete")}
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
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
                onClick={() => setIsDialogOpen(false)}
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
