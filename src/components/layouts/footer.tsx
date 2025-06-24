import { GitHubIcon } from "@/components/icons";
import { useLanguage } from "@/contexts/language-context";

export const Footer = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="border-t border-chess-gray-200 p-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <a
          href="https://github.com/checkmate-works/blindfold-chess"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-chess-gray-600 hover:text-chess-gray-900 transition-all duration-200 hover:scale-105"
        >
          <GitHubIcon className="w-5 h-5" />
          <span className="font-medium">GitHub</span>
        </a>

        <div className="flex items-center space-x-2">
          <span className="text-xl">🌐</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ja")}
            className="bg-chess-white border border-chess-gray-300 text-chess-gray-700 py-1.5 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-chess-gray-900 focus:border-transparent hover:border-chess-gray-400 transition-colors cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
