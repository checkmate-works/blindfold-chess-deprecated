import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validatePgn } from "../utils/pgn-parser";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const PgnInput = ({ value, onChange, onSubmit }: Props) => {
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
    <div className="space-y-2">
      <label
        htmlFor="pgn"
        className="block text-sm font-medium text-gray-700"
      >
        {t("game.pgnInput.submit")}
      </label>
      <textarea
        id="pgn"
        value={value}
        onChange={handleChange}
        placeholder={t("game.pgnInput.placeholder")}
        className="w-full h-32 px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
