import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timers = [0, 200, 600].map((ms) =>
        setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), ms)
      );
      return () => timers.forEach(clearTimeout);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
