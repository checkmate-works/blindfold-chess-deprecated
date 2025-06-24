import { useTranslation } from "react-i18next";
import { PlayerColor } from "@/types";
import { ColorOption } from "./color-option";

type ColorSelectorProps = {
  selectedColor: PlayerColor;
  onColorSelect: (color: PlayerColor) => void;
};

export const ColorSelector = ({
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("game.color.title")}
        </h3>
        <p className="text-sm text-gray-600">
          Choose your piece color for the game
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(["white", "black", "random"] as PlayerColor[]).map((color) => (
          <ColorOption
            key={color}
            color={color}
            selected={selectedColor === color}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};
