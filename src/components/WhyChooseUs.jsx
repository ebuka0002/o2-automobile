import { whyUs } from "../data/content";

/** Ruled list rather than cards, so this section reads differently from Services. */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="border-y border-line bg-surface" aria-labelledby="why-title">
      <div className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="why-title" className="h-display text-5xl md:text-7xl">Why 02 Automobile?</h2>
          <p className="mt-5 max-w-sm text-muted">A straightforward way to buy a vehicle, with people who keep you informed.</p>
        </div>
        <ul>
          {whyUs.map(({ icon: Icon, title, text }) => (
            <li key={title} className="group flex items-start gap-5 border-t border-line py-7 last:border-b">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <div className="flex-1 md:flex md:items-baseline md:justify-between md:gap-8">
                <h3 className="font-display text-3xl font-semibold uppercase tracking-wide transition-colors group-hover:text-accent">{title}</h3>
                <p className="mt-1 text-muted md:max-w-xs md:text-right">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
