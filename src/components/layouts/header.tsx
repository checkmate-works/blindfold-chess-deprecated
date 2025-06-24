import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-amber-50/50 border-b border-amber-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
          <p className="text-sm text-amber-700 text-center">
            🚧 This is a beta version. You may encounter bugs or issues.
          </p>
        </div>
      </div>
      <header className="bg-chess-white border-b border-chess-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex items-center space-x-4">
          <h1 className="text-xl font-bold text-chess-gray-800 tracking-tight">
            <Link to="/" className="hover:text-chess-accent transition-colors">
              {t("app.title")}
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
};
