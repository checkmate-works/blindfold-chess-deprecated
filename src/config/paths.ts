export const paths = {
  root: "/",
  game: {
    setup: "/game/setup",
    play: "/game/play",
  },
} as const;

export type AppRoute = keyof typeof paths;
