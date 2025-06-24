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
    "bg-chess-white text-chess-black border-2 border-chess-gray-900":
      color === "white",
    "bg-chess-gray-900 text-chess-white border-2 border-chess-gray-900":
      color === "black",
    "bg-[linear-gradient(to_right,white_50%,black_50%)] text-chess-gray-900 border-2 border-chess-gray-400":
      color === "random",
  });

  const selectedStyles = clsx({
    "ring-2 ring-chess-gray-900 ring-offset-2 shadow-lg": selected,
    "hover:shadow-md hover:scale-[1.02]": !selected,
  });

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, colorClasses, selectedStyles)}
      aria-label={t(`game.color.${color}`)}
    >
      {color === "random" ? (
        <div className="relative text-6xl leading-none">
          {/* Single king with outline to work on gradient background */}
          <span
            className="text-gray-700"
            style={{
              textShadow:
                "1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white",
            }}
          >
            ♔
          </span>
        </div>
      ) : (
        <span className="text-6xl leading-none">{iconMap[color]}</span>
      )}
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-chess-gray-900 rounded-full flex items-center justify-center">
          <span className="text-chess-white text-xs">✓</span>
        </div>
      )}
    </button>
  );
};
