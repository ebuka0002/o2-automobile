// Single source of truth for company details.
// Anything in [square brackets] is a placeholder — replace it with real information.

// ➜ Change the WhatsApp number HERE (international format, digits only, no "+").
export const WHATSAPP_NUMBER = "234XXXXXXXXXX";

export const siteConfig = {
  name: "02 Automobile",
  legalName: "02 Automobile Company",
  tagline: "Quality vehicles & automotive services",
  url: "https://[your-domain]", // used for canonical URLs, Open Graph and JSON-LD
  phoneDisplay: "[Company Phone]",
  phoneDial: "+234XXXXXXXXXX",
  whatsapp: WHATSAPP_NUMBER,
  email: "[Company Email]",
  address: "[Company Address]",
  hours: "[Opening hours]",
  city: "", // set for local SEO once known
  // Social profile URLs. Leave "" until you have real ones; the icon renders disabled.
  instagram: "",
  facebook: "",
  tiktok: "",
  // Currency (ISO 4217) + locale used by formatPrice().
  currency: "NGN",
  locale: "en-NG",
  // Banner photography (Pexels — free to use, no attribution required). Swap these for the
  // dealership's own photos any time — put files in /public/assets and update the paths here.
  heroImage: "https://images.pexels.com/photos/12984743/pexels-photo-12984743.jpeg?auto=compress&cs=tinysrgb&w=1920",
  aboutImage: "https://images.pexels.com/photos/29633948/pexels-photo-29633948/free-photo-of-alfa-romeo-8c-competizione-in-modern-showroom.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ctaImage: "https://images.pexels.com/photos/29707848/pexels-photo-29707848/free-photo-of-sleek-white-car-on-scenic-desert-road.jpeg?auto=compress&cs=tinysrgb&w=1920",
  // Shows a "demo inventory" notice. Set false once real vehicles are live.
  showDemoNotice: true,
};
