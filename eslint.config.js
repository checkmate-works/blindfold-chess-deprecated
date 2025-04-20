import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/discussions should not import from src/features/comments, etc.
            {
              target: "./src/features/home",
              from: "./src/features",
              except: ["./home"],
            },
            {
              target: "./src/features/game",
              from: "./src/features",
              except: ["./game"],
            },
          ],
        },
      ],
    },
  },
);
