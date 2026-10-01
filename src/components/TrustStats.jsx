import { Check } from "lucide-react";
import Counter from "./Counter";
import { stats, trustPoints } from "../data/content";

export default function TrustStats() {
  return (
    <section className="stage border-y border-line" aria-labelledby="trust-title">
      <div className="container-x grid gap-14 py-20 lg:grid-cols-[1fr_1.3fr] lg:py-24">
        <div>
          <h2 id="trust-title" className="h-display text-5xl md:text-6xl">Trusted for the Journey Ahead</h2>
          <ul className="mt-8 space-y-3">
            {trustPoints.map((p) => (
              <li key={p} className="flex items-center gap-3 text-fg/85"><Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-8 sm:px-8">
                <dd className="order-1 font-display text-5xl font-bold text-accent sm:text-7xl"><Counter to={s.value} suffix={s.suffix} /></dd>
                <dt className="mt-2 text-xs text-muted sm:text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">Placeholder figures — replace with verified company numbers.</p>
        </div>
      </div>
    </section>
  );
}
