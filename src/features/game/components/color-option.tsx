import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { PlayerColor } from "@/types";

type ColorOptionProps = {
  color: PlayerColor;
  selected?: boolean;
  onClick?: () => void;
};

const iconMap: Record<PlayerColor, string> = {
  white: "♔",
  black: "♚",
  random: "♔",
};

export const ColorOption = ({ color, selected, onClick }: ColorOptionProps) => {
  const { t } = useTranslation();
  const baseClasses =
    "group relative w-full aspect-square rounded-xl flex flex-col items-center justify-center font-medium transition-all duration-200 shadow-sm overflow-hidden";

  const colorClasses = clsx({
    "bg-white text-black border-2 border-gray-900": color === "white",
    "bg-gray-900 text-white border-2 border-gray-900": color === "black",
    "bg-gradient-to-r from-white via-white to-gray-900 text-gray-900 border-2 border-gray-400":
      color === "random",
  });

  const selectedStyles = clsx({
    "ring-2 ring-gray-900 ring-offset-2 shadow-lg": selected,
    "hover:shadow-md hover:scale-[1.02]": !selected,
  });

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, colorClasses, selectedStyles)}
      aria-label={t(`game.color.${color}`)}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-4xl leading-none">{iconMap[color]}</span>
        <span className="text-xs font-semibold tracking-wide uppercase">
          {t(`game.color.${color}`)}
        </span>
      </div>
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      )}
    </button>
  );
};
