import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-2">
          <p className="text-sm text-yellow-800 text-center">
            🚧 This is a beta version. You may encounter bugs or issues.
          </p>
        </div>
      </div>
      <header className="border-b border-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            <Link
              to="/"
              className="flex items-center space-x-4 hover:opacity-80 transition"
            >
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span>{t("app.title")}</span>
            </Link>
          </h1>
        </div>
      </header>
    </>
  );
};
