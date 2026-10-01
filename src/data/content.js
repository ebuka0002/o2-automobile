import { ShieldCheck, Eye, UserCheck, HeartHandshake, MessageCircle, Gem, Scale, Smile, Briefcase } from "lucide-react";

export const brandNames = ["Toyota", "Lexus", "Mercedes-Benz", "BMW", "Audi", "Ford", "Honda", "Range Rover"];

export const whyUs = [
  { icon: ShieldCheck, title: "Quality First", text: "Carefully selected vehicles." },
  { icon: Eye, title: "Transparent Process", text: "Clear communication and straightforward information." },
  { icon: UserCheck, title: "Expert Assistance", text: "Support throughout your vehicle search." },
  { icon: HeartHandshake, title: "Customer Focus", text: "Your needs remain central to the experience." },
  { icon: MessageCircle, title: "Convenient Enquiries", text: "Easy access through phone, WhatsApp and online forms." },
];

export const steps = [
  { title: "Browse", text: "Explore the inventory, filter by what matters to you and save favourites." },
  { title: "Enquire", text: "Ask a question, request a viewing or message us on WhatsApp." },
  { title: "Inspect", text: "See the vehicle in person and review it with our team." },
  { title: "Drive", text: "Complete the paperwork and take your next vehicle home." },
];

// Placeholder figures — replace with verified numbers, or remove the section.
export const stats = [
  { value: 100, suffix: "+", label: "Vehicles sourced" },
  { value: 50, suffix: "+", label: "Happy customers" },
  { value: 5, suffix: "+", label: "Years of experience" },
];

export const trustPoints = [
  "Quality-focused vehicle selection",
  "Transparent communication",
  "Customer-first service",
  "Professional assistance",
];

export const values = [
  { icon: Scale, title: "Integrity", text: "We say what we mean and do what we say." },
  { icon: Gem, title: "Quality", text: "We put careful selection ahead of volume." },
  { icon: Eye, title: "Transparency", text: "Clear information at every step of the process." },
  { icon: Smile, title: "Customer satisfaction", text: "A good experience matters as much as the sale." },
  { icon: Briefcase, title: "Professionalism", text: "Courteous, prepared and respectful of your time." },
];

export const faqs = [
  { q: "Are the vehicles inspected?", a: "We assist with inspection and verification before you commit. Speak to the team about the checks available for a vehicle you are interested in." },
  { q: "Can I request a specific vehicle?", a: "Yes. Our sourcing service helps customers find a particular make, model or specification. Send us the details through the enquiry form or WhatsApp." },
  { q: "Do you offer vehicle delivery?", a: "We can help coordinate delivery. Contact us with your location and we will explain the options." },
  { q: "Can I trade in my current vehicle?", a: "You can enquire about trading in your existing vehicle. Share its make, model, year and mileage and the team will respond." },
  { q: "Can I book a vehicle viewing?", a: "Yes. Use the Book a Viewing form, choose your preferred date and time, and the team will confirm with you." },
  { q: "Do you offer financing?", a: "Please ask the team about financing options. The calculator on each vehicle page is an estimate only and is not a financing offer." },
  { q: "How do I make an enquiry?", a: "Use the enquiry form, message us on WhatsApp, or call. Every vehicle page has all three options." },
];

// Placeholder articles — structured so they can be fed from a CMS later.
export const insights = [
  { id: "choose-suv", category: "Buying guide", readTime: "5 min read", title: "How to choose the right SUV", excerpt: "Size, seating, drive type and running costs: the questions to settle before you shortlist." },
  { id: "used-car-checks", category: "Inspection", readTime: "6 min read", title: "What to check before buying a used car", excerpt: "From service history to a proper test drive, a practical checklist for used-vehicle buyers." },
  { id: "maintenance", category: "Ownership", readTime: "4 min read", title: "Understanding vehicle maintenance", excerpt: "What routine servicing covers and how to keep a vehicle reliable for longer." },
];
