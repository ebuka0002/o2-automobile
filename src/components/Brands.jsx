import { brandNames } from "../data/content";

/** Text wordmarks only — no logos are used. */
export default function Brands() {
  return (
    <section className="container-x py-24" aria-labelledby="brands-title">
      <h2 id="brands-title" className="h-display text-4xl md:text-5xl">Brands We Work With</h2>
      <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {brandNames.map((b) => (
          <li key={b} className="grid h-24 place-items-center bg-bg px-3 text-center font-display text-2xl font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent md:h-28 md:text-3xl">{b}</li>
        ))}
      </ul>
    </section>
  );
}
