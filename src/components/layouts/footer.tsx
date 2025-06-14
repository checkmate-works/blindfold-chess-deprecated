import { CodeBracketIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/contexts/language-context";

export const Footer = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="border-t border-gray-200 p-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <a
          href="https://github.com/checkmate-works/blindfold-chess"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <CodeBracketIcon className="w-5 h-5" />
          <span>GitHub</span>
        </a>

        <div className="flex items-center space-x-2">
          <LanguageIcon className="w-5 h-5 text-gray-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ja")}
            className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
