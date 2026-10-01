/**
 * Form submission — DEMO ONLY. Nothing leaves the browser yet.
 * Replace the body of this function to connect a real service:
 *
 * Supabase   → const { error } = await supabase.from("enquiries").insert(payload)
 * EmailJS    → await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
 * Resend     → await fetch("/api/enquiry", { method: "POST", body: JSON.stringify(payload) })
 *              (call Resend from your own serverless function — its API key must never be in frontend code)
 * Custom API → await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, { ... })
 */
export async function submitForm(kind, payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, kind, payload };
}
