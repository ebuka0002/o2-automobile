import { Star } from "lucide-react";

export default function TestimonialCard({ item }) {
  return (
    <figure className="max-w-3xl">
      <div className="flex gap-1" role="img" aria-label={`${item.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-4 w-4 ${n <= item.rating ? "fill-accent text-accent" : "text-line"}`} aria-hidden="true" />)}
      </div>
      <blockquote className="mt-6 font-display text-3xl font-medium leading-tight tracking-wide md:text-5xl">“{item.text}”</blockquote>
      <figcaption className="mt-6 text-sm text-muted"><span className="font-semibold text-fg">{item.name}</span> · {item.location}</figcaption>
    </figure>
  );
}
