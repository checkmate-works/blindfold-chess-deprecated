import { Link } from "react-router-dom";
type Props = {
  title?: string;
};

export const Header = ({ title = "" }: Props) => {
  return (
    <header className="border-b border-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          <Link
            to="/"
            className="flex items-center space-x-4 hover:opacity-80 transition"
          >
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span>{title}</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};
