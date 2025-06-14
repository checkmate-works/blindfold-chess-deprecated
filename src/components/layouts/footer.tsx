import { CodeBracketIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 p-4">
      <a
        href="https://github.com/checkmate-works/blindfold-chess"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <CodeBracketIcon className="w-5 h-5" />
        <span>GitHub</span>
      </a>
    </footer>
  );
};
