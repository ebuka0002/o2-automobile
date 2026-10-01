const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateForm(mode, v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  else if (v.name.trim().length < 2) e.name = "Your name looks too short.";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^[+\d\s()-]+$/.test(v.phone) || digits.length < 10 || digits.length > 15)
    e.phone = "Enter a valid phone number, e.g. +234 800 000 0000.";

  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";

  if (mode === "viewing") {
    if (!v.date) e.date = "Please choose a preferred date.";
    else if (new Date(v.date) < new Date(new Date().toDateString())) e.date = "Choose a date from today onwards.";
    if (!v.time) e.time = "Please choose a preferred time.";
    if (v.message.length > 1000) e.message = "Please keep your message under 1000 characters.";
  } else {
    if (!v.message.trim()) e.message = "Please tell us how we can help.";
    else if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
    else if (v.message.length > 1000) e.message = "Please keep your message under 1000 characters.";
  }
  return e;
}
