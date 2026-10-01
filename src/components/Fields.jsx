import { ChevronDown } from "lucide-react";

export function SelectField({ id, label, value, onChange, options, placeholder = "Any", error, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="field appearance-none pr-10"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#e0654f]">{error}</p>}
    </div>
  );
}

export function TextField({ id, label, value, onChange, error, multiline = false, className = "", ...rest }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      <Tag
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
        {...rest}
      />
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-[#e0654f]">{error}</p>}
    </div>
  );
}
