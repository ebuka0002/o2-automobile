import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import { useSeo } from "../hooks/useSeo";
import { values, steps } from "../data/content";

export default function About() {
  useSeo({ title: "About Us | 02 Automobile Company", description: "Learn about 02 Automobile Company: our story, mission, vision and the values behind a professional, transparent car-buying experience.", path: "/about" });
  const block = "grid gap-6 border-b border-line py-14 md:grid-cols-[1fr_2fr] md:py-20";
  return (
    <>
      <PageHeader title="Driven by trust." text="Built for the road ahead." />
      <div className="container-x">
        <Reveal className={block}>
          <h2 className="h-display text-4xl md:text-5xl">Our Story</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            02 Automobile Company was created to make finding a quality vehicle simpler and more transparent. We connect customers with vehicles that suit their needs, and we keep the process honest, clear and respectful of your time. <span className="text-fg">[Add the company’s real founding story here.]</span>
          </p>
        </Reveal>
        <div className="grid border-b border-line md:grid-cols-2 md:divide-x md:divide-line">
          <Reveal className="py-14 md:py-20 md:pr-12">
            <h2 className="h-display text-4xl md:text-5xl">Our Mission</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">To connect customers with quality vehicles while providing a professional, transparent and customer-focused experience.</p>
          </Reveal>
          <Reveal className="border-t border-line py-14 md:border-t-0 md:py-20 md:pl-12" delay={0.1}>
            <h2 className="h-display text-4xl md:text-5xl">Our Vision</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">To be a trusted name for vehicle buyers, known for quality, clear communication and lasting relationships.</p>
          </Reveal>
        </div>

        <section className={block} aria-labelledby="values-title">
          <h2 id="values-title" className="h-display text-4xl md:text-5xl">Our Values</h2>
          <ul>
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-5 border-t border-line py-6 first:border-t-0 first:pt-0">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                <div><h3 className="font-display text-3xl font-semibold uppercase tracking-wide">{title}</h3><p className="mt-1 text-muted">{text}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="way-title">
          <h2 id="way-title" className="h-display text-4xl md:text-5xl">How we work with you</h2>
          <ol className="mt-10 border-l border-line">
            {steps.map((s) => (
              <li key={s.title} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 bg-accent" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold uppercase tracking-wide">{s.title}</h3>
                <p className="mt-1 max-w-md text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/vehicles" className="btn btn-primary mt-10">Browse Vehicles</Link>
        </section>
      </div>
      <CTA />
    </>
  );
}
