/** Brand mark: the "02" sits in a plate (like a race number / registration plate) beside a spaced wordmark. */
export default function Logo({ size = "md" }) {
  const plate = size === "sm" ? "h-9 w-11 text-[1.35rem]" : "h-11 w-[3.25rem] text-[1.65rem]";
  return (
    <span className="inline-flex items-center gap-3" aria-label="02 Automobile">
      <span className={`grid ${plate} place-items-center border border-accent font-display font-bold leading-none tracking-wide text-accent outline outline-1 outline-offset-[3px] outline-accent/40`}>
        02
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold uppercase tracking-[0.34em] text-fg">Automobile</span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-muted">Company</span>
      </span>
    </span>
  );
}
