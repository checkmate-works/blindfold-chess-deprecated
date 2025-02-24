import { createBrowserRouter } from "react-router-dom";
import Home from "@/features/home/routes/Home";
import Game from "@/features/game/routes/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);
