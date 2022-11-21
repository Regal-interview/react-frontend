import { useLayoutEffect } from "react";

export function useDocumentClassToggle(token: string, force: boolean = false) {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle(token, force);
  }, [force]);
}
