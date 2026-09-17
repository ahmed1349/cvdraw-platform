import { useEffect, useRef } from "react";
import { useCVStore } from "@/app/store/cvStore";

const DELAY_MS = 700;

export function useAutosave() {
  const persistCurrent = useCVStore((state) => state.persistCurrent);
  const saveStatus = useCVStore((state) => state.saveStatus);
  const currentId = useCVStore((state) => state.currentId);
  const cvs = useCVStore((state) => state.cvs);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (saveStatus !== "unsaved") return;

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      void persistCurrent();
    }, DELAY_MS);

    return () => window.clearTimeout(timer.current);
  }, [saveStatus, currentId, cvs, persistCurrent]);

  useEffect(() => {
    const flush = () => {
      if (useCVStore.getState().saveStatus === "unsaved") {
        void persistCurrent();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [persistCurrent]);
}
