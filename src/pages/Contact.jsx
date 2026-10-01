import { Phone, Mail, Clock, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import ViewingForm from "../components/ViewingForm";
import MapPlaceholder from "../components/MapPlaceholder";
import FAQ from "../components/FAQ";
import { WhatsAppIcon } from "../components/icons";
import { siteConfig } from "../config/site";
import { whatsappLink } from "../lib/format";
import { useSeo } from "../hooks/useSeo";
import { businessSchema } from "../lib/schema";

export default function Contact() {
  useSeo({
    title: "Contact Us | 02 Automobile Company",
    description: "Contact 02 Automobile Company by phone, WhatsApp or email, book a viewing, and find our location.",
    path: "/contact",
    jsonLd: { "@context": "https://schema.org", ...businessSchema() },
  });
  const rows = [
    [Phone, "Phone", siteConfig.phoneDisplay, `tel:${siteConfig.phoneDial}`],
    [Mail, "Email", siteConfig.email, null],
    [WhatsAppIcon, "WhatsApp", "Message us", whatsappLink()],
    [MapPin, "Location", siteConfig.address, null],
    [Clock, "Opening hours", siteConfig.hours, null],
  ];
  return (
    <>
      <PageHeader title="Get In Touch" text="Ask a question, request a vehicle or arrange a visit." />
      <div className="container-x grid gap-14 py-16 lg:grid-cols-[1fr_1.2fr] lg:py-24">
        <ul className="divide-y divide-line border-y border-line self-start">
          {rows.map(([Icon, label, value, href]) => (
            <li key={label} className="flex items-start gap-4 py-5">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted">{label}</p>
                {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold hover:text-accent">{value}</a> : <p className="font-semibold">{value}</p>}
              </div>
            </li>
          ))}
        </ul>
        <section aria-labelledby="msg-title" className="border border-line bg-surface p-6 md:p-8">
          <h2 id="msg-title" className="h-display mb-6 text-3xl md:text-4xl">Send a message</h2>
          <ContactForm />
        </section>
      </div>

      <section id="viewing" className="border-y border-line bg-surface" aria-labelledby="viewing-title">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="viewing-title" className="h-display text-5xl md:text-6xl">Book a Viewing</h2>
            <p className="mt-4 max-w-sm text-muted">Choose a vehicle and a time that suits you. The team will confirm your request.</p>
          </div>
          <ViewingForm />
        </div>
      </section>

      <section className="container-x py-20" aria-labelledby="loc-title">
        <h2 id="loc-title" className="h-display mb-8 text-4xl md:text-5xl">Find the dealership</h2>
        <MapPlaceholder />
      </section>

      <section id="faq" className="container-x pb-24" aria-labelledby="faq-title">
        <h2 id="faq-title" className="h-display mb-8 text-4xl md:text-5xl">Frequently asked questions</h2>
        <FAQ />
      </section>
    </>
  );
}
