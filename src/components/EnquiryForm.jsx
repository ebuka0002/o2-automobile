import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SelectField, TextField } from "./Fields";
import { useVehicles } from "../hooks/useAsync";
import { validateForm } from "../lib/validate";
import { submitForm } from "../lib/submit";
import { vehicleTitle } from "../lib/format";

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map((t) => ({ value: t, label: t }));

const COPY = {
  enquiry: { submit: "Send Enquiry", sending: "Sending…", done: "Enquiry sent successfully", next: "A member of the team would follow up shortly." },
  viewing: { submit: "Request Viewing", sending: "Requesting…", done: "Viewing request sent successfully", next: "The team would confirm your date and time." },
  contact: { submit: "Send Message", sending: "Sending…", done: "Message sent successfully", next: "The team would reply as soon as possible." },
};

/** One form for three jobs: vehicle enquiry, viewing request and general contact. */
export default function EnquiryForm({ mode = "enquiry", vehicle = null, idPrefix = "f", onDone }) {
  const { data: vehicles } = useVehicles();
  const [values, setValues] = useState({
    name: "", phone: "", email: "", date: "", time: "",
    vehicleId: vehicle?.id || "",
    message: mode === "enquiry" && vehicle ? `I'm interested in the ${vehicle.year} ${vehicleTitle(vehicle)}. Please share more information.` : "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const copy = COPY[mode];
  const set = (key) => (value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    const found = validateForm(mode, values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${idPrefix}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitForm(mode, { ...values, vehicle: vehicle ? { id: vehicle.id, title: vehicleTitle(vehicle) } : undefined });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-6 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" strokeWidth={1.4} aria-hidden="true" />
        <h3 className="h-display mt-4 text-3xl">{copy.done}</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          {copy.next} This is a demo — nothing was actually sent. Connect a service in <code className="text-fg">src/lib/submit.js</code>.
        </p>
        {onDone && <button onClick={onDone} className="btn btn-outline mt-6">Close</button>}
      </div>
    );
  }

  const vehicleOptions = [
    ...(vehicles || []).map((v) => ({ value: v.id, label: `${v.year} ${vehicleTitle(v)}` })),
    { value: "undecided", label: "Not sure yet" },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {mode === "enquiry" && vehicle && (
        <div className="border border-line bg-surface2 px-4 py-3 text-sm sm:col-span-2">
          <span className="text-muted">Enquiring about </span>
          <strong>{vehicle.year} {vehicleTitle(vehicle)}</strong>
        </div>
      )}
      <TextField id={`${idPrefix}-name`} label="Full name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
      <TextField id={`${idPrefix}-phone`} label="Phone" type="tel" inputMode="tel" value={values.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" placeholder="+234 …" />
      <TextField id={`${idPrefix}-email`} label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" className="sm:col-span-2" />
      {mode === "viewing" && (
        <>
          <SelectField id={`${idPrefix}-vehicleId`} label="Vehicle" value={values.vehicleId} onChange={set("vehicleId")} options={vehicleOptions} placeholder="Choose a vehicle" className="sm:col-span-2" />
          <TextField id={`${idPrefix}-date`} label="Preferred date" type="date" value={values.date} onChange={set("date")} error={errors.date} min={new Date().toISOString().slice(0, 10)} />
          <SelectField id={`${idPrefix}-time`} label="Preferred time" value={values.time} onChange={set("time")} options={TIMES} placeholder="Select a time" error={errors.time} />
        </>
      )}
      <TextField
        id={`${idPrefix}-message`}
        label={mode === "viewing" ? "Message (optional)" : "Message"}
        multiline
        rows={4}
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        className="sm:col-span-2"
      />
      {status === "failed" && <p className="text-sm text-[#e0654f] sm:col-span-2" role="alert">Something went wrong. Please try again or contact us on WhatsApp.</p>}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary sm:col-span-2">
        {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" /> {copy.sending}</>) : copy.submit}
      </button>
    </form>
  );
}
