import { siteConfig } from "../config/site";

/** Central price formatter — change currency/locale in src/config/site.js. */
export function formatPrice(amount, currency = siteConfig.currency, locale = siteConfig.locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const formatMileage = (km) => `${new Intl.NumberFormat("en").format(km)} km`;
export const vehicleTitle = (v) => `${v.brand} ${v.model}`;

export const GENERAL_WHATSAPP_MESSAGE =
  "Hello 02 Automobile Company, I would like to make an enquiry about your vehicles.";

export const vehicleWhatsAppMessage = (v) =>
  `Hello 02 Automobile Company, I am interested in the ${vehicleTitle(v)} ${v.year}. Please provide more information.`;

export const whatsappLink = (message = GENERAL_WHATSAPP_MESSAGE) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const isPlaceholder = (value) => !value || String(value).includes("[") || String(value).includes("XXX");
