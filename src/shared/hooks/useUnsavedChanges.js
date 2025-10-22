// src/shared/hooks/useUnsavedChanges.js
import { useEffect } from "react";
import { unstable_useBlocker as useBlocker } from "react-router"; 
export default function useUnsavedChanges(when) {
  // Warn on tab close / refresh
  useEffect(() => {
    if (!when) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when]);

  // Block in-app navigation
  try {
    const blocker = useBlocker?.(when);
    useEffect(() => {
      if (!blocker) return; // older router without the hook
      if (blocker.state === "blocked") {
        const ok = window.confirm("You have unsaved changes. Leave without saving?");
        if (ok) blocker.proceed();
        else blocker.reset();
      }
    }, [blocker]);
  } catch {
    // If your react-router version doesn't expose unstable_useBlocker,
    // we silently skip in-app blocking; the beforeunload warning still works.
  }
}
