export const paths = {
  root: "/",
  game: {
    setup: "/game/setup",
    play: "/game/play",
  },
  tips: {
    list: "/tips",
    detail: "/tips/:slug",
  },
} as const;

export type AppRoute = keyof typeof paths;
