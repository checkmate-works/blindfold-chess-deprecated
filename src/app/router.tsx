import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/routes/app/home";
import { GameSetup } from "@/routes/app/game/setup";
import { GamePlay } from "@/routes/app/game/play";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game/setup",
    element: <GameSetup />,
  },
  {
    path: "/game/play",
    element: <GamePlay />,
  },
]);
