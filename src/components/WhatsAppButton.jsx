import { WhatsAppIcon } from "./icons";
import { whatsappLink, vehicleWhatsAppMessage } from "../lib/format";

/** Floating (default) or inline WhatsApp link. Pass `vehicle` for a vehicle-specific message. */
export default function WhatsAppButton({ vehicle, floating = true, children, className = "" }) {
  const href = whatsappLink(vehicle ? vehicleWhatsAppMessage(vehicle) : undefined);
  if (!floating) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <WhatsAppIcon className="h-5 w-5" />
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with 02 Automobile on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:grid"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
