import { siteConfig } from "../config/site";
import { isPlaceholder, vehicleTitle } from "./format";

const known = (value) => (isPlaceholder(value) ? undefined : value);
const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""));
const sameAs = () => [siteConfig.instagram, siteConfig.facebook, siteConfig.tiktok].filter(Boolean);

// Only real information is emitted. Placeholder values are skipped automatically.
export const organizationSchema = () =>
  clean({
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: known(siteConfig.url),
    email: known(siteConfig.email),
    telephone: known(siteConfig.phoneDial),
    sameAs: sameAs().length ? sameAs() : undefined,
  });

export const websiteSchema = () =>
  clean({ "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.legalName, url: known(siteConfig.url) });

export const businessSchema = () =>
  clean({
    "@type": "AutomotiveBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    url: known(siteConfig.url),
    telephone: known(siteConfig.phoneDial),
    email: known(siteConfig.email),
    address: known(siteConfig.address)
      ? { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: siteConfig.city || undefined }
      : undefined,
  });

export const homeSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [organizationSchema(), websiteSchema(), businessSchema()],
});

export const vehicleSchema = (v) => ({
  "@context": "https://schema.org",
  ...clean({
    "@type": "Vehicle",
    name: `${v.year} ${vehicleTitle(v)}`,
    brand: { "@type": "Brand", name: v.brand },
    model: v.model,
    vehicleModelDate: String(v.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "KMT" },
    fuelType: v.fuel,
    vehicleTransmission: v.transmission,
    color: v.exteriorColor,
    description: v.description,
    // Demo listings are not real offers, so pricing is only published for real inventory.
    offers: v.demo ? undefined : { "@type": "Offer", price: v.price, priceCurrency: v.currency },
  }),
});
