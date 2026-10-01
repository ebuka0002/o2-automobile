import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { WhatsAppIcon } from "./icons";
import { siteConfig } from "../config/site";
import { whatsappLink } from "../lib/format";

const COLUMNS = [
  { title: "Company", links: [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Why Us", "/#why-us"]] },
  { title: "Vehicles", links: [["All Vehicles", "/vehicles"], ["Featured", "/vehicles?featured=1"], ["Saved Vehicles", "/saved"], ["Compare", "/compare"]] },
  { title: "Support", links: [["Contact", "/contact"], ["FAQ", "/contact#faq"], ["Book a Viewing", "/contact#viewing"]] },
];

export default function Footer() {
  const row = "flex items-start gap-3 text-sm text-muted hover:text-fg";
  return (
    <footer className="stage border-t border-line pb-24 pt-16 md:pb-10">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              02 Automobile Company connects customers with quality vehicles through a professional, transparent and customer-focused experience.
            </p>
            <div className="mt-6"><SocialLinks /></div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="label">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map(([label, to]) => (
                    <li key={label}><Link to={to} className="text-sm text-muted transition-colors hover:text-fg">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div>
            <h2 className="label">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li><a href={`tel:${siteConfig.phoneDial}`} className={row}><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{siteConfig.phoneDisplay}</a></li>
              <li><span className={row}><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{siteConfig.email}</span></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={row}><WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />WhatsApp</a></li>
              <li><span className={row}><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{siteConfig.address}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 02 Automobile Company. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><span title="Add your policy page">Privacy Policy</span></li>
            <li><span title="Add your terms page">Terms &amp; Conditions</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
