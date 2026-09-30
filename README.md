# The Tech Marketer — Portfolio (Next.js)

Scroll-driven marketing portfolio. Next.js 15 (App Router) + TypeScript. No UI libraries.

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Deploy on Vercel
1. Push this folder to GitHub, or run `npx vercel` in this folder.
2. In Vercel: Project > Settings > Environment Variables, add:
   - `RESEND_API_KEY` (free at resend.com)
   - `CONTACT_TO_EMAIL` (where leads land)
   - `CONTACT_FROM` (optional, must be a verified Resend sender)
3. Redeploy. Leads from the form now arrive in your inbox.

If the env vars are missing the form still works: it copies the visitor's brief and opens your X profile.

## Edit content
- `lib/config.ts`: handle, availability badge, booking link (Calendly/Cal.com)
- `app/page.tsx`: all section copy
- `components/Samples.tsx`: writing samples (replace with real work when you have it)
- `components/ScrollEngine.tsx`: nib movement (`K`) and background colours (`S`)
- `app/globals.css`: styles
