import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { siteConfig } from "../config/site";
import { whatsappLink } from "../lib/format";
import { useStore } from "../context/StoreContext";

export default function StickyMobileBar() {
  const { openEnquiry } = useStore();
  const item = "flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold";
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-bg/95 backdrop-blur md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${item} text-fg`}>
        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
        WhatsApp
      </a>
      <a href={`tel:${siteConfig.phoneDial}`} className={`${item} border-x border-line text-fg`}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call us
      </a>
      <button onClick={() => openEnquiry()} className={`${item} bg-accent text-on-accent`}>
        Enquire
      </button>
    </nav>
  );
}
