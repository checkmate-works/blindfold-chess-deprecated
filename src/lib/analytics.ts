// Google Analytics utility functions
type GtagFunction = (
  command: "config" | "event" | "js",
  targetId: string | Date,
  config?: Record<string, unknown>,
) => void;

type DataLayerItem = {
  event?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag: GtagFunction;
    dataLayer: DataLayerItem[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Check if GA should be enabled (production environment with measurement ID)
const isGAEnabled = () => {
  return !!GA_MEASUREMENT_ID && import.meta.env.PROD;
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isGAEnabled()) {
    // Only log in development
    if (import.meta.env.DEV) {
      console.info(
        `[GA] Disabled - Environment: ${import.meta.env.MODE}, ` +
          `Has ID: ${!!GA_MEASUREMENT_ID}, ` +
          `Is Prod: ${import.meta.env.PROD}`,
      );
    }
    return;
  }

  console.info(`[GA] Initializing with ID: ${GA_MEASUREMENT_ID}`);

  // Add GA script to head
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_title: document.title,
      page_location: window.location.href,
    });
  `;
  document.head.appendChild(script2);

  console.info("[GA] Initialized successfully");
};

// Track page views
export const trackPageView = (page_path: string, page_title?: string) => {
  if (!isGAEnabled()) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path,
      page_title: page_title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  if (!isGAEnabled()) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Chess-specific event tracking
export const trackGameEvent = {
  startGame: (skillLevel: number, playerColor: string) => {
    trackEvent("game_start", "chess", `level_${skillLevel}_${playerColor}`);
  },

  endGame: (result: "win" | "loss" | "draw", moves: number) => {
    trackEvent("game_end", "chess", result, moves);
  },

  makeMove: (move: string, moveNumber: number) => {
    trackEvent("move_made", "chess", move, moveNumber);
  },

  takeBack: () => {
    trackEvent("take_back", "chess");
  },

  viewBoard: () => {
    trackEvent("view_board", "chess");
  },
};
