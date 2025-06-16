import { useTranslation } from "react-i18next";

type StartMethod = "new" | "pgn";

type Props = {
  selectedMethod: StartMethod;
  onMethodSelect: (method: StartMethod) => void;
};

export const StartMethodSelector = ({ selectedMethod, onMethodSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">
        {t("game.setup.title")}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onMethodSelect("new")}
          className={`px-4 py-3 rounded-lg border-2 ${
            selectedMethod === "new"
              ? "border-black bg-black text-white"
              : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
          }`}
        >
          <div className="font-medium">{t("game.setup.newGame")}</div>
          <div className="text-sm mt-1">
            {t("game.setup.newGameDescription")}
          </div>
        </button>
        <button
          onClick={() => onMethodSelect("pgn")}
          className={`px-4 py-3 rounded-lg border-2 ${
            selectedMethod === "pgn"
              ? "border-black bg-black text-white"
              : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
          }`}
        >
          <div className="font-medium">{t("game.setup.startFromPgn")}</div>
          <div className="text-sm mt-1">
            {t("game.setup.startFromPgnDescription")}
          </div>
        </button>
      </div>
    </div>
  );
};
