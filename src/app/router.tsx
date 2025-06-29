import { createBrowserRouter } from "react-router-dom";
import GamePlayRoute from "@/app/routes/game/play";
import GameSetupRoute from "@/app/routes/game/setup";
import AppRoot from "@/app/routes/home";
import { RootLayout } from "@/components/root-layout";
import { paths } from "@/config/paths";
import TipDetailRoute from "@/features/tips/routes/tip-detail";
import TipsListRoute from "@/features/tips/routes/tips-list";

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
      {
        path: paths.tips.list,
        element: <TipsListRoute />,
      },
      {
        path: paths.tips.detail,
        element: <TipDetailRoute />,
      },
    ],
  },
]);
