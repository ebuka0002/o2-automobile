import { steps } from "../data/content";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="stage border-y border-line" aria-labelledby="how-title">
      <div className="container-x py-24 md:py-28">
        <h2 id="how-title" className="h-display text-5xl md:text-7xl">How It Works</h2>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-line md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="relative">
              <span className="relative z-10 grid h-[3.2rem] w-[3.2rem] place-items-center border border-accent bg-bg font-display text-2xl font-bold text-accent">{i + 1}</span>
              <h3 className="mt-5 font-display text-3xl font-semibold uppercase tracking-wide">{s.title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
