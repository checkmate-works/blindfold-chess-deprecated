import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface UsePageLeaveOptions {
  onBeforeLeave?: () => Promise<void> | void;
  shouldPrevent?: () => boolean;
}

export const usePageLeave = ({
  onBeforeLeave,
  shouldPrevent,
}: UsePageLeaveOptions) => {
  const navigate = useNavigate();
  const isLeavingRef = useRef(false);
  const originalNavigateRef = useRef(navigate);

  // Handle browser back/forward/refresh/close
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (shouldPrevent?.() && !isLeavingRef.current) {
        e.preventDefault();
        e.returnValue = "";

        if (onBeforeLeave) {
          await onBeforeLeave();
        }
      }
    };

    const handlePopState = async () => {
      if (shouldPrevent?.() && !isLeavingRef.current) {
        if (onBeforeLeave) {
          await onBeforeLeave();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBeforeLeave, shouldPrevent]);

  // Create a wrapped navigate function that handles auto-save
  const navigateWithSave = useCallback(
    async (to: string | number) => {
      if (shouldPrevent?.() && !isLeavingRef.current && onBeforeLeave) {
        isLeavingRef.current = true;
        await onBeforeLeave();
      }

      if (typeof to === "string") {
        originalNavigateRef.current(to);
      } else {
        originalNavigateRef.current(to);
      }
    },
    [onBeforeLeave, shouldPrevent],
  );

  // Override global navigation for links
  useEffect(() => {
    const handleLinkClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;

      if (
        link &&
        !link.href.startsWith("http") &&
        shouldPrevent?.() &&
        !isLeavingRef.current
      ) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && onBeforeLeave) {
          isLeavingRef.current = true;
          await onBeforeLeave();
          originalNavigateRef.current(href);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [onBeforeLeave, shouldPrevent]);

  return { navigateWithSave };
};
