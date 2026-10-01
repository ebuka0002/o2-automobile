import { useEffect } from "react";
import { siteConfig } from "../config/site";

function setTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, path = "/", image, jsonLd, noindex = false }) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const url = `${siteConfig.url}${path}`;
    document.title = title;
    setTag("name", "description", description);
    setTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setTag("property", "og:title", title);
    setTag("property", "og:description", description);
    setTag("property", "og:url", url);
    setTag("property", "og:type", "website");
    setTag("name", "twitter:card", image ? "summary_large_image" : "summary");
    if (image) setTag("property", "og:image", image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.getElementById("ld-json")?.remove();
    if (ld) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json";
      script.textContent = ld;
      document.head.appendChild(script);
    }
    return () => document.getElementById("ld-json")?.remove();
  }, [title, description, path, image, ld, noindex]);
}
