import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validatePgn } from "@/utils/pgn-parser";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const PgnInput = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (newValue) {
      const isValid = validatePgn(newValue);
      setError(isValid ? null : t("game.pgnInput.invalidFormat"));
    } else {
      setError(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("game.pgnInput.submit")}
        </h3>
        <p className="text-sm text-gray-600">
          Paste your PGN notation to continue from a specific position
        </p>
      </div>
      <div className="space-y-3">
        <textarea
          id="pgn"
          value={value}
          onChange={handleChange}
          placeholder={t("game.pgnInput.placeholder")}
          className="w-full h-40 px-4 py-3 text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-300 font-mono text-sm"
        />
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
