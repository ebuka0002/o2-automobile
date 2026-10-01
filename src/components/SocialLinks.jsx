import { Instagram, Facebook } from "lucide-react";
import { WhatsAppIcon, TikTokIcon } from "./icons";
import { siteConfig } from "../config/site";
import { whatsappLink } from "../lib/format";

export default function SocialLinks() {
  const items = [
    { label: "Instagram", href: siteConfig.instagram, Icon: Instagram },
    { label: "Facebook", href: siteConfig.facebook, Icon: Facebook },
    { label: "TikTok", href: siteConfig.tiktok, Icon: TikTokIcon },
    { label: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
  ];
  const base = "grid h-11 w-11 place-items-center border border-line text-fg/80";
  return (
    <ul className="flex gap-2">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${base} transition-colors hover:border-accent hover:text-accent`}>
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ) : (
            <span className={`${base} cursor-not-allowed opacity-40`} title={`Add the ${label} URL in src/config/site.js`} role="img" aria-label={`${label} (link not set)`}>
              <Icon className="h-[18px] w-[18px]" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
