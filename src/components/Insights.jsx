import { insights } from "../data/content";

/** Placeholder articles. Feed `insights` from a CMS (Sanity, Contentful, Supabase…) later. */
export default function Insights() {
  const [lead, ...rest] = insights;
  return (
    <section className="container-x pb-24 md:pb-32" aria-labelledby="insights-title">
      <h2 id="insights-title" className="h-display text-5xl md:text-7xl">Automotive Insights</h2>
      <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-[1.4fr_1fr]">
        <article className="bg-surface p-8 md:p-12">
          <p className="label">{lead.category}</p>
          <h3 className="mt-6 font-display text-4xl font-semibold uppercase leading-none tracking-wide md:text-6xl">{lead.title}</h3>
          <p className="mt-4 max-w-md text-muted">{lead.excerpt}</p>
          <p className="mt-8 text-xs text-muted">{lead.readTime} · Placeholder article</p>
        </article>
        <div className="grid gap-px">
          {rest.map((a) => (
            <article key={a.id} className="bg-surface p-8">
              <p className="label">{a.category}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold uppercase leading-none tracking-wide">{a.title}</h3>
              <p className="mt-3 text-sm text-muted">{a.excerpt}</p>
              <p className="mt-5 text-xs text-muted">{a.readTime} · Placeholder article</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
