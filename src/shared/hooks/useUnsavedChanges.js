import { useEffect, useContext } from "react";
import { UNSAFE_NavigationContext } from "react-router";

/**
 * Warns on tab close/refresh and blocks in-app navigation if `when` is true.
 * Works across React Router v6 without relying on unstable hooks.
 */
export default function useUnsavedChanges(when) {
  // Warn on tab close / refresh
  useEffect(() => {
    if (!when) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome to show a prompt
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when]);

  // Block in-app navigation using the router's navigator.block
  const navContext = useContext(UNSAFE_NavigationContext);
  const navigator = navContext?.navigator;

  useEffect(() => {
    if (!when || !navigator?.block) return;

    const unblock = navigator.block((tx) => {
      const ok = window.confirm("You have unsaved changes. Leave without saving?");
      if (ok) {
        // allow this transition to proceed
        unblock();      // stop blocking further transitions
        tx.retry();     // retry the pending transition
      }
      // else: do nothing, stay on the page
    });

    return unblock;
  }, [navigator, when]);
}

