import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Toaster } from "react-hot-toast";
import "@/i18n/config";
import * as Sentry from "@sentry/react";
import { LanguageProvider } from "@/contexts/language-context";

if (!import.meta.env.DEV) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,
  });
}

export const App = () => {
  return (
    <LanguageProvider>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};
