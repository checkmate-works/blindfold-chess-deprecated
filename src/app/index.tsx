import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Toaster } from "react-hot-toast";
import "@/i18n/config";
import * as Sentry from "@sentry/react";
import { AppProvider } from "@/app/provider";
import { env } from "@/config/env";

if (!env.isDev) {
  Sentry.init({
    dsn: env.sentry.dsn,
    sendDefaultPii: true,
  });
}

export const App = () => {
  return (
    <AppProvider>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </AppProvider>
  );
};
