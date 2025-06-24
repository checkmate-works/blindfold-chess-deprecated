import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "@/i18n/config";
import { AppProvider } from "@/app/provider";
import { router } from "@/app/router";
import { env } from "@/config/env";
import { initGA } from "@/lib/analytics";

if (!env.isDev) {
  Sentry.init({
    dsn: env.sentry.dsn,
    sendDefaultPii: true,
  });
}

export const App = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <AppProvider>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </AppProvider>
  );
};
