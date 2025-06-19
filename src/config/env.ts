const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const env = {
  isDev: import.meta.env.DEV,
  sentry: {
    dsn: getEnvVar("VITE_SENTRY_DSN"),
  },
} as const;
