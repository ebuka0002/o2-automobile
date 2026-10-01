import { Link } from "react-router-dom";
import { SearchX, Heart, CarFront } from "lucide-react";

const ICONS = { search: SearchX, heart: Heart, car: CarFront };

/** Shared empty / error panel. `action` is { label, to } or { label, onClick }. */
export default function StateMessage({ icon = "search", title, text, action, className = "" }) {
  const Icon = ICONS[icon];
  return (
    <div className={`border border-dashed border-line px-6 py-16 text-center ${className}`}>
      <Icon className="mx-auto h-10 w-10 text-accent" aria-hidden="true" strokeWidth={1.4} />
      <h2 className="h-display mt-5 text-3xl md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{text}</p>
      {action &&
        (action.to ? (
          <Link to={action.to} className="btn btn-primary mt-7">{action.label}</Link>
        ) : (
          <button onClick={action.onClick} className="btn btn-primary mt-7">{action.label}</button>
        ))}
    </div>
  );
}
