import { createBrowserRouter } from "react-router-dom";
import AppRoot from "@/app/routes/home";
import GameSetupRoute from "@/app/routes/game/setup";
import GamePlayRoute from "@/app/routes/game/play";
import { paths } from "@/config/paths";

export const router = createBrowserRouter([
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
]);
