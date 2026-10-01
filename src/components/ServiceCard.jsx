export default function ServiceCard({ service: { icon: Icon, title, text } }) {
  return (
    <article className="group h-full bg-surface p-8 transition-colors hover:bg-surface2">
      <Icon className="h-8 w-8 text-accent" strokeWidth={1.4} aria-hidden="true" />
      <h3 className="mt-10 font-display text-3xl font-semibold uppercase tracking-wide">{title}</h3>
      <p className="mt-2 text-muted">{text}</p>
      <span className="mt-8 block h-px w-8 bg-accent transition-all duration-300 group-hover:w-16" aria-hidden="true" />
    </article>
  );
}
