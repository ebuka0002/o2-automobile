import { useMemo, useState } from "react";
import { formatPrice } from "../lib/format";

const num = (v) => (v === "" || Number.isNaN(Number(v)) ? 0 : Math.max(0, Number(v)));

export default function FinanceCalculator({ price: initialPrice, currency }) {
  const [price, setPrice] = useState(String(initialPrice));
  const [deposit, setDeposit] = useState(String(Math.round(initialPrice * 0.3)));
  const [months, setMonths] = useState("36");
  const [rate, setRate] = useState("15");

  const result = useMemo(() => {
    const principal = Math.max(0, num(price) - num(deposit));
    const n = num(months);
    const r = num(rate) / 100 / 12;
    if (!principal || !n) return { monthly: 0, principal, total: 0 };
    const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    return { monthly, principal, total: monthly * n };
  }, [price, deposit, months, rate]);

  const input = "field";
  const label = "mb-1.5 block text-xs font-medium text-muted";
  return (
    <section aria-labelledby="calc-title" className="grid gap-px border border-line bg-line lg:grid-cols-[1.2fr_1fr]">
      <div className="bg-surface p-6 md:p-8">
        <h2 id="calc-title" className="h-display text-3xl md:text-4xl">Estimate Your Monthly Payment</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="calc-price" className={label}>Vehicle price</label><input id="calc-price" type="number" min="0" inputMode="numeric" className={input} value={price} onChange={(e) => setPrice(e.target.value)} /></div>
          <div><label htmlFor="calc-deposit" className={label}>Deposit</label><input id="calc-deposit" type="number" min="0" inputMode="numeric" className={input} value={deposit} onChange={(e) => setDeposit(e.target.value)} /></div>
          <div>
            <label htmlFor="calc-months" className={label}>Loan duration</label>
            <select id="calc-months" className={`${input} appearance-none`} value={months} onChange={(e) => setMonths(e.target.value)}>
              {[12, 24, 36, 48, 60].map((m) => <option key={m} value={m}>{m} months</option>)}
            </select>
          </div>
          <div><label htmlFor="calc-rate" className={label}>Interest rate (% per year)</label><input id="calc-rate" type="number" min="0" step="0.1" inputMode="decimal" className={input} value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-surface2 p-6 md:p-8" aria-live="polite">
        <p className="text-sm text-muted">Estimated Monthly Payment</p>
        <p className="mt-2 font-display text-5xl font-bold tracking-wide text-accent md:text-6xl">{formatPrice(Math.round(result.monthly), currency)}</p>
        <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Amount financed</dt><dd>{formatPrice(Math.round(result.principal), currency)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Total repayable</dt><dd>{formatPrice(Math.round(result.total), currency)}</dd></div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-muted">Estimated only — actual financing terms may vary. This is not a financing offer from 02 Automobile Company.</p>
      </div>
    </section>
  );
}
