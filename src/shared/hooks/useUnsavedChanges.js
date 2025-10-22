import { useEffect } from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";

/** Warns on window unload + blocks in-app navigation if `when` is true. */
export default function useUnsavedChanges(when) {
  // Browser/tab close, refresh
  useEffect(() => {
    if (!when) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when]);

  // In-app route transitions
  const blocker = useBlocker(when);
  useEffect(() => {
    if (blocker.state === "blocked") {
      const ok = window.confirm("You have unsaved changes. Leave without saving?");
      if (ok) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);
}
