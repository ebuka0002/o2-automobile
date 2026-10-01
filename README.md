# 02 Automobile Company — dealership website

React + Vite + Tailwind CSS v4 + React Router + Framer Motion + Lucide.

## Run it
```
npm install
npm run dev
```
Production build: `npm run build` (output in `dist/`).

## Structure
- `src/config/site.js` — company details, WhatsApp number, socials, currency, hero/about/CTA image paths
- `src/data/` — `vehicles.js` (inventory), `testimonials.js`, `services.js`, `content.js` (FAQ, insights, values, stats, brands)
- `src/lib/` — `format.js` (price formatter + WhatsApp links), `inventory.js` (filters/sorting), `submit.js` (form backend hook), `api.js` (data-fetch layer), `schema.js` (JSON-LD), `validate.js`
- `src/context/StoreContext.jsx` — theme, favourites, compare list, enquiry modal (all persisted in localStorage where relevant)
- `src/components/` — reusable UI; `src/pages/` — one file per route
- Routes: `/`, `/vehicles`, `/vehicles/:id`, `/about`, `/services`, `/contact`, `/saved`, `/compare`, 404

## Add a vehicle
Open `src/data/vehicles.js`, copy an entry, give it a unique `id`, edit the fields. Set `demo: false` on real vehicles.

## Change company information
Edit `src/config/site.js`. Everything in `[square brackets]` is a placeholder. Empty social URLs render as disabled icons.

## Change the WhatsApp number
`WHATSAPP_NUMBER` at the top of `src/config/site.js` (international format, digits only, e.g. `2348012345678`).

## Replace images
Put files in `public/assets/vehicles/<vehicle-id>/` and list them in the vehicle's `images` array, e.g. `["/assets/vehicles/bmw-x5-2022/1.jpg"]`. Until then the site shows built-in placeholder artwork. For the hero / about / CTA banners, set `heroImage`, `aboutImage`, `ctaImage` in `site.js`. Keep photos around 1600px wide and compressed (WebP/JPEG).

## Deploy
- **Vercel:** import the repo, framework preset "Vite". `vercel.json` already handles SPA routing.
- **Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` already handles SPA routing.
Then set `url` in `site.js` to the live domain (used for canonical URLs, Open Graph and JSON-LD).

## Future backend
- **Enquiries / viewings / contact:** replace the body of `src/lib/submit.js` (Supabase insert, EmailJS, or a `/api` serverless function that calls Resend).
- **Real inventory:** replace `src/lib/api.js` with Supabase/REST calls. Components already use loading and error states.
- **Auth + admin dashboard:** Supabase Auth with a protected `/admin` route for managing vehicles and enquiries; Row Level Security on tables.
- **Email notifications / financing / payments:** trigger from a serverless function or Supabase Edge Function.
- **Secrets:** only public keys (`VITE_` prefix, see `.env.example`) belong in the frontend. Service-role keys, Resend keys and payment secrets stay on the server.

## Notes
- Inventory, testimonials, statistics and articles are clearly marked placeholders — replace before launch.
- The financing calculator is an estimate only, not an offer.
- No address is invented; the map is a placeholder ready for a Google Maps / OpenStreetMap embed.
