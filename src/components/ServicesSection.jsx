import ServiceCard from "./ServiceCard";
import { services } from "../data/services";

export default function ServicesSection({ heading = "Our Services", as: H = "h2" }) {
  return (
    <section className="container-x py-24 md:py-32" aria-labelledby="services-title">
      <H id="services-title" className="h-display text-5xl md:text-7xl">{heading}</H>
      <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => <li key={s.id}><ServiceCard service={s} /></li>)}
      </ul>
    </section>
  );
}
