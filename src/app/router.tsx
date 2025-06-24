import { createBrowserRouter } from "react-router-dom";
import GamePlayRoute from "@/app/routes/game/play";
import GameSetupRoute from "@/app/routes/game/setup";
import AppRoot from "@/app/routes/home";
import { RootLayout } from "@/components/root-layout";
import { paths } from "@/config/paths";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: paths.root,
        element: <AppRoot />,
      },
      {
        path: paths.game.setup,
        element: <GameSetupRoute />,
      },
      {
        path: paths.game.play,
        element: <GamePlayRoute />,
      },
    ],
  },
]);
