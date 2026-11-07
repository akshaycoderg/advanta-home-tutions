# Advanta Home Tutions — website

A complete Next.js website for **Advanta Home Tutions**, a home tuition agency in Varanasi, Uttar Pradesh.

It includes a parent enquiry flow, a tutor application flow with private document uploads, service pages, blog articles, legal pages, FAQs, local SEO, and an honest configuration system: anything that has not been supplied by the business shows a clear "not yet available" state instead of invented information.

---

## 1. What is in this project

| Area | What was built |
| --- | --- |
| Pages | Home, About Us, Find a Home Tutor, Classes & Subjects, How It Works, Become a Tutor, Contact, FAQs, Privacy Policy, Terms & Conditions, Blog, 404 |
| Flexible content | Blog system in `lib/blog.ts`; locality pages in `lib/areas.ts` (empty until real areas are added) |
| Parent form | Client + server validation, spam trap, rate limiting, reference number, honest storage result, optional WhatsApp hand-off |
| Tutor form | Same protection, plus up to 3 private documents (PDF/JPG/PNG, 5 MB each), MIME + file-signature checks |
| Storage | Google Sheets (recommended, two separate sheets), Supabase (optional database and private document storage), or private local files in `.data/` (development only). Production without any configured storage refuses to pretend a submission was saved |
| SEO | Per-page metadata, canonicals, Open Graph/Twitter images, sitemap, robots.txt, breadcrumb/FAQ/blog/service structured data |
| Design | Navy `#003F7E`, royal blue, orange `#FE6F09`, white and soft blue; mobile-first responsive layout; reduced-motion support |
| Docs | This README, `.env.example`, and `supabase/schema.sql` |

**Important:** the website does not currently claim testimonials, tutor counts, results, years of experience, guaranteed response times, a physical office, or verified service areas. Those details were not supplied and must not be invented.

---

## 2. Requirements

- **Node.js 20.9 or newer** (tested with Node 24).
- npm (the project has a `package-lock.json`).
- A Supabase account for production form storage.
- A hosting account that supports Next.js server routes (Vercel is the easiest option).

On Windows PowerShell, if `npm` is blocked by the execution policy, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

On macOS/Linux, use the normal commands.

---

## 3. Run it locally

### Step 1 — Install dependencies

```powershell
npm.cmd install
```

### Step 2 — Create your local environment file

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` in a text editor. You can leave everything blank for a first look. In development the forms save to `.data/` automatically, so the flows can be tested without Supabase.

### Step 3 — Start the development server

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

| Command | Purpose |
| --- | --- |
| `npm.cmd run dev` | Start the local development server |
| `npm.cmd run build` | Create an optimised production build |
| `npm.cmd run start` | Run the production build locally (after `build`) |
| `npm.cmd run typecheck` | Check TypeScript |
| `npm.cmd run lint` | Check code style and React rules |

> Do not run `npm run build` while the dev server is using the same `.next` folder. Stop the dev server first if you see a build conflict.

---

## 4. Environment variables

All variables are documented with examples in `.env.example`. The important ones:

| Variable | Required? | What it controls |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes in production** | Canonical URLs, sitemap, robots, social previews. Must be a valid absolute URL such as `https://your-domain.com` |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Optional | Click-to-call number |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | WhatsApp button. International format, no `+` or spaces, e.g. `919876543210` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Optional | Public email link |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Optional | Opening hours shown on Contact |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_YOUTUBE_URL`, `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Social links; empty links are hidden |
| `NEXT_PUBLIC_SERVICE_AREAS` | Optional | Comma-separated verified localities, e.g. `Sigra, Lanka, Bhelupur` |
| `GOOGLE_SHEETS_PARENT_WEBHOOK_URL` | For parent leads | Apps Script web app URL for the parent-enquiry sheet |
| `GOOGLE_SHEETS_TUTOR_WEBHOOK_URL` | For tutor leads | Apps Script web app URL for the tutor-application sheet |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | With Sheets | Shared secret checked by both Apps Script deployments |
| `SUPABASE_URL` | Optional backend | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional backend | Supabase secret/service-role key (server-side only) |
| `SUPABASE_STORAGE_BUCKET` | Optional | Defaults to `tutor-documents` |
| `LOCAL_DATA_DIR` | Optional | Where development data is written; defaults to `.data/` |
| `LOCAL_LEAD_STORE` | Optional | Set `true` only on a non-serverless demo to keep local storage in a production build |
| `LEAD_NOTIFICATION_WEBHOOK_URL` | Optional | Private webhook notified of new leads |
| `LEAD_WEBHOOK_SECRET` | Optional | Sent as `X-Webhook-Secret` to the webhook |

### About `NEXT_PUBLIC_` variables

Variables beginning with `NEXT_PUBLIC_` are baked into the browser files **at build time**. After changing one, you must rebuild or redeploy. Secret values must **never** use the `NEXT_PUBLIC_` prefix.

---

## 5. Storage setup (Google Sheets, Supabase, local development)

Google Sheets is the simplest way to receive every enquiry automatically. Use **two separate spreadsheets** — one for parents and one for tutors. Supabase is optional for the text records, but it is still required when a tutor uploads verification documents, because those files must stay in private storage.

If no storage is configured in production, the forms return an honest *"Online submissions are not connected yet"* message. They do **not** report a fake success.

### 5.1 Google Sheets setup (recommended for leads)

The ready-made Apps Script is in `google-apps-script/Code.gs`.

1. Create two Google Sheets, for example **Advanta — Parent Enquiries** and **Advanta — Tutor Applications**. Keep both private; share them only with authorised staff.
2. Open the **parent** spreadsheet, then **Extensions → Apps Script**.
3. Replace the default code with the contents of `google-apps-script/Code.gs`.
4. At the top of the script:
   - Set `EXPECTED_TYPE = "parent_enquiry"`.
   - Replace `SHARED_SECRET` with a long random value. Generate one with a password manager, or run `openssl rand -hex 32`.
   - Leave `SHEET_NAME` blank to use the first tab, or enter a tab name.
5. Save, then choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Authorise the script when Google asks. Copy the URL ending in `/exec`.
6. Repeat steps 2–5 in the **tutor** spreadsheet, setting `EXPECTED_TYPE = "tutor_application"` and using the **same** `SHARED_SECRET`.
7. Add the values to `.env.local` and to your hosting provider's environment variables:

   ```text
   GOOGLE_SHEETS_PARENT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_SHEETS_TUTOR_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_SHEETS_WEBHOOK_SECRET=the-same-long-random-value
   ```

8. Restart `npm run dev`, or rebuild/redeploy production.
9. Submit one test enquiry and one test application. A new row should appear in each sheet. The script creates the header row automatically.

Notes:

- “Who has access: Anyone” only makes the web app callable; the spreadsheet itself stays private. The shared secret is checked on every request.
- The webhook URLs and secret are server-side only. Never put them in `NEXT_PUBLIC_*`.
- If you edit the Apps Script later, create a **new version** of the deployment (or the old URL may keep running the old code).
- If Sheets is configured but a write fails, the website falls back to Supabase or local development storage when available. If nothing is available, it shows an error and does not claim success.
- Tutor applications **with documents** are stored in Supabase private storage first, then mirrored to the tutor sheet. The sheet never receives document contents.

### 5.2 Create the Supabase project

1. Sign in at [supabase.com](https://supabase.com) and create a new project.
2. Wait for the database to finish provisioning.
3. Open **SQL Editor**.

### 5.3 Run the schema

1. Open `supabase/schema.sql` from this project.
2. Copy the whole file into the Supabase SQL Editor.
3. Run it once.

The script creates:

- `public.enquiries` — private parent enquiries.
- `public.tutor_applications` — private tutor applications, with document metadata only (no public URLs).
- Indexes and `updated_at` triggers.
- Row Level Security on both tables, with **no public policies**. Only the server's service-role key can access them.
- A **private** storage bucket named `tutor-documents`, limited to PDF/JPG/PNG and 5 MB per file.

### 5.4 Verify the security settings

In the Supabase dashboard:

- **Table Editor → enquiries / tutor_applications**: confirm RLS is enabled.
- **Storage → tutor-documents**: the bucket must show as **Private**, not Public.
- **Authentication → Policies**: there should be no public policies on these tables or the bucket.

The verification SQL at the bottom of `schema.sql` can also be run in the SQL Editor.

### 5.5 Add the keys to the website

In Supabase, open **Project Settings → API** (or **Project Settings → API Keys**):

- Copy the **Project URL** into `SUPABASE_URL`.
- Copy the **service_role / secret key** into `SUPABASE_SERVICE_ROLE_KEY`.

Add them to `.env.local` for local testing, and to your hosting provider's environment variables for production.

**Never** put the service-role key in `NEXT_PUBLIC_*`, in client-side code, in a screenshot, or in a public repository. If it is exposed, rotate it immediately in Supabase.

### 5.6 Local development without Supabase or Sheets

Leave the Google Sheets and Supabase values blank. When `npm run dev` is running:

- Enquiries are appended to `.data/enquiries.jsonl`.
- Tutor applications are appended to `.data/tutor-applications.jsonl`.
- Uploaded files are stored in `.data/uploads/<reference>/`.

`.data/` is gitignored and is not served by the website. It is a development convenience only. Serverless hosts do not keep local files, which is why production needs Google Sheets or Supabase. Supabase is still required for private tutor-document uploads.

After testing, delete `.data/` if it contains personal information you do not need.

---

## 6. How the forms actually behave

### Parent enquiry (`/find-a-home-tutor`)

- Validated in the browser **and** again in `app/api/enquiries/route.ts`.
- Honeypot field to reject simple bots.
- Same-origin check and an in-memory limit of **5 attempts per IP per 10 minutes**.
- Maximum JSON body size: 24 KB.
- A reference like `AHT-P-261106-ABC123` is generated only after successful storage.
- Success screen says exactly where the data went:
  - **Google Sheets** → "saved to the team's Google Sheet".
  - **Supabase** → "saved and is available to our team".
  - **Local development** → "stored locally so the flow could be tested".
- The parent sheet receives every field from the form, including the full address, because the sheet is private and the team needs it for scheduling.
- If production has no storage configured, the form shows a clear error and only suggests a contact route that actually exists.
- The optional WhatsApp button is opened only after the visitor clicks it. The prefilled message deliberately **excludes the full home address**.

### Tutor application (`/become-a-tutor`)

- Same validation and spam protections; limit of **3 attempts per IP per 15 minutes**.
- Maximum request size: 20 MB.
- Up to **3 files**, each **5 MB or smaller**, accepted as PDF, JPG or PNG.
- The server checks the declared MIME type **and** the file's magic bytes, so a renamed executable cannot pass as a document.
- Documents are stored in the private Supabase bucket, or in `.data/uploads/` during development.
- The database stores private object paths and metadata — never a public URL.
- Uploaded documents are not displayed on any public tutor profile.
- If the database insert fails after files were uploaded, those private files are removed again.
- A tutor application **without documents** can go straight to the tutor Google Sheet. An application **with documents** requires private document storage; if Supabase is not configured, the form asks the applicant to remove the files or send the application without them. It never silently discards an upload.
- When both are configured, the text application is mirrored to the tutor sheet after the private files and database row succeed. A mirror failure is logged and does not lose the application.

### What is not automatic

- No email or SMS is sent by the website.
- No WhatsApp message is sent automatically; WhatsApp opens in the visitor's app and they choose to send.
- No payment is collected.
- Rate limiting is in-memory per server instance. For sustained abusive traffic, add a durable limiter such as Upstash.

---

## 7. Build and deploy

### 7.1 Build locally

```powershell
npm.cmd run build
npm.cmd run start
```

The production server runs at [http://localhost:3000](http://localhost:3000) by default.

### 7.2 Recommended: Vercel

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket). Git is not currently installed in the original working environment, so this step may need to be done on another machine.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js**. Build command: `npm run build`. Output: default Next.js output.
4. Add the environment variables from `.env.example` in **Settings → Environment Variables**. At minimum:
   - `NEXT_PUBLIC_SITE_URL` = your final `https://` domain.
   - `GOOGLE_SHEETS_PARENT_WEBHOOK_URL`, `GOOGLE_SHEETS_TUTOR_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` to receive leads in Google Sheets.
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` if you want a database backup or private tutor-document uploads.
5. Deploy.
6. Add your custom domain in **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

### 7.3 Other hosting

Use any host that can run a Next.js Node server and its API routes (for example a VPS, Docker, Railway, Render or similar). **Do not use a static export.** The enquiry and tutor APIs are server routes and need a Node runtime.

Set the same environment variables on the host. The `.data/` fallback is not suitable for serverless or ephemeral filesystems; configure Google Sheets (and Supabase for tutor documents) instead.

If you self-host on a persistent server and deliberately want the local file fallback, set `LOCAL_LEAD_STORE=true`. This is **not** recommended for a public production site because it is harder to back up and secure than the database.

### 7.4 Domain and DNS

No domain is configured in this project. When the business has one:

1. Point the domain at the host using the DNS records the host provides.
2. Set `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com`.
3. Redeploy so canonicals, sitemap and social previews use the real domain.
4. Submit `https://your-real-domain.com/sitemap.xml` in Google Search Console.

---

## 8. Test checklist

Run these before launch:

### Code quality

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

All three should finish without errors.

### Pages

- Home, About, Find a Home Tutor, Classes & Subjects, How It Works, Become a Tutor, Contact, FAQs, Privacy Policy, Terms & Conditions, Blog and all four blog posts.
- An unknown URL should show the custom 404 page.
- `/home-tutor/anything` should 404 until a real area is added to `lib/areas.ts`.
- Check the mobile menu opens, closes with Escape, closes after navigation, and does not leave the page scrolled-locked.
- Check keyboard focus and the "Skip to main content" link.

### SEO

- Each page has a unique `<title>`, description and canonical.
- `/sitemap.xml` and `/robots.txt` load.
- `/opengraph-image` returns an image.
- View source and confirm JSON-LD is valid and contains no invented address, rating or review.

### Forms

- Submit a valid parent enquiry in development → success screen says it was stored locally, and a line appears in `.data/enquiries.jsonl`.
- Submit invalid values → field-level errors, no record is written.
- Trigger the rate limit after 5 parent attempts → 429 response with a friendly message.
- Submit a valid tutor application with a real PDF/JPEG/PNG → success screen reports the file count and files appear in `.data/uploads/`.
- Try a `.txt`, an oversized file, or a fake `.pdf` containing text → rejected.
- With Google Sheets configured, submit one parent enquiry and one tutor application → a new row appears in the correct sheet, with the correct reference number. Do not put real personal data in a test sheet you will publish.
- In a production build with no Google Sheets, Supabase or local storage, submissions must show the "not connected" message, **not** a success screen.
- With Supabase configured, confirm rows appear in the tables and documents appear in the private bucket. Treat this as a manual test that requires real credentials.
- A tutor application with a document must be rejected clearly if private document storage is not configured; it must not drop the file silently.

### Contact links

- Phone/WhatsApp/email links only appear when configured.
- WhatsApp opens with a prefilled message and never includes the full home address.
- `tel:` links contain digits only.
- Social icons only appear when real URLs are set.

---

## 9. Editing guide for beginners

You do **not** need to understand the whole codebase. Most routine changes happen in a few files.

### Change contact details, hours, fees or service areas

- Put real values in `.env.local` (development) and in the hosting dashboard (production).
- Fee range and city/state live in `lib/config.ts`.
- `NEXT_PUBLIC_SERVICE_AREAS` controls the comma-separated list of verified localities.

After editing environment variables, stop and restart `npm run dev`, or rebuild/redeploy for production.

### Change the Google Sheets or spreadsheet columns

- Webhook URLs and the shared secret live in `.env.local` / the hosting dashboard, never in page files.
- To add a column, edit `PARENT_COLUMNS` or `TUTOR_COLUMNS` in `google-apps-script/Code.gs`, add the matching field name sent by `app/api/enquiries/route.ts` or `app/api/tutor-applications/route.ts`, then deploy a new Apps Script version and append the new header in the sheet.
- Each form has its own sheet and its own Apps Script deployment. Keep `EXPECTED_TYPE` correct in each one.
- Do not make the spreadsheets public. The Apps Script URL is server-side only.

### Change page text

Open the relevant file in `app/`:

| Page | File |
| --- | --- |
| Home | `app/page.tsx` |
| About Us | `app/about/page.tsx` |
| Find a Home Tutor | `app/find-a-home-tutor/page.tsx` |
| Classes & Subjects | `app/classes-and-subjects/page.tsx` |
| How It Works | `app/how-it-works/page.tsx` |
| Become a Tutor | `app/become-a-tutor/page.tsx` |
| Contact Us | `app/contact/page.tsx` |
| FAQs | `app/faqs/page.tsx` |
| Privacy Policy | `app/privacy-policy/page.tsx` |
| Terms & Conditions | `app/terms-and-conditions/page.tsx` |

Plain text sits between HTML-like tags such as `<p>`, `<h2>` and `<li>`. Change the words, keep the tags, and save.

### Change classes, boards, subjects, benefits or process steps

Edit `lib/content.ts`. It holds the lists used across multiple pages:

- `CLASS_GROUPS`, `BOARDS`, `SUBJECTS`, `STUDENT_CLASSES`
- `BENEFITS`, `HOW_IT_WORKS_FOUR`, `HOW_IT_WORKS_DETAILED`
- `TUTOR_ELIGIBILITY`, `VERIFICATION_STEPS`, `PARENT_COMMITMENTS`, `COMMISSION_TERMS`
- `SITE_LAST_UPDATED`

If you add a new subject, also check the form validation in `lib/validation.ts` — it uses the same lists.

### Change FAQs

Edit `lib/faqs.ts`. Each FAQ is an object with a question and answer. Parent and tutor FAQs are grouped there.

### Add or edit a blog post

Edit `lib/blog.ts`. Copy an existing object and change:

- `slug` — the URL ending, lowercase with hyphens.
- `title`, `description`, `category`, `date`, `readingTime`.
- `blocks` — paragraphs, headings, lists and callouts.

The post appears automatically on `/blog`, in the sitemap and at `/blog/<slug>`. Do not add fake dates, results or claims.

### Add a locality page

Edit `lib/areas.ts`. **Only add an area when the agency genuinely covers it** and you can write useful, specific content. Each area needs:

```ts
{
  slug: "lanka-varanasi",
  name: "Lanka, Varanasi",
  published: true,
  intro: "…unique introduction…",
  landmarks: ["…"],
  coverageNote: "Tutor availability is confirmed case by case.",
}
```

Then also add the locality to `NEXT_PUBLIC_SERVICE_AREAS` if you want it listed publicly.

The list is empty by default, so `/home-tutor/<area>` returns 404. This is intentional: no thin, auto-generated location pages.

### Change navigation and footer links

Edit `lib/navigation.ts`.

### Change the logo or colours

- Logo files: `public/images/logo-mark.png`, `logo-full.png`, `logo-stacked.png`; app icons: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`.
- The supplied logo was processed by `scripts/prepare-assets.mjs`. That script references the original files in the owner's Downloads folder, so it is a one-off helper — do not run it on a machine that does not have those exact files.
- To replace the logo safely, replace the PNG files with the same names and similar proportions, then check the header, footer, About page, social preview and favicons.
- Brand colours are in `app/globals.css` under `@theme` (the `--color-navy-*`, `--color-royal-*` and `--color-orange-*` scales). `lib/config.ts` also records the core brand values.

### Change SEO titles and descriptions

Each page has a `metadata` block near the top of its file, usually built with `pageMetadata()` from `lib/seo.ts`. Change the `title`, `description`, `path` and keywords there. Keep each description accurate and unique.

The site-wide defaults are in `app/layout.tsx`. Sitemap routes are in `app/sitemap.ts`. The social preview image is generated by `app/opengraph-image.tsx`.

### Change the legal pages

Edit `app/privacy-policy/page.tsx` and `app/terms-and-conditions/page.tsx`. Have the final wording reviewed by a qualified legal professional. Update `SITE_LAST_UPDATED` in `lib/content.ts` when the policies change.

---

## 10. Remaining business details needed before launch

The site is deliberately honest about missing information. These details still need to be supplied by the business:

| # | Detail | Why it matters | Where to set it |
| --- | --- | --- | --- |
| 1 | **Final domain name** | Canonicals, sitemap, social previews | `NEXT_PUBLIC_SITE_URL` |
| 2 | **Public phone number** | Click-to-call; currently hidden | `NEXT_PUBLIC_BUSINESS_PHONE` |
| 3 | **WhatsApp business number** | WhatsApp contact; currently hidden | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| 4 | **Public email address** | Contact and privacy requests | `NEXT_PUBLIC_BUSINESS_EMAIL` |
| 5 | **Opening hours and time zone** | Contact page; currently hidden | `NEXT_PUBLIC_BUSINESS_HOURS` |
| 6 | **Verified service areas/localities** | Honest coverage and optional locality pages | `NEXT_PUBLIC_SERVICE_AREAS` and `lib/areas.ts` |
| 7 | **Social media profiles** | Footer/contact links; currently hidden | `NEXT_PUBLIC_INSTAGRAM_URL`, etc. |
| 8 | **Legal entity / trading name** | Invoices, contracts, policy accuracy | `siteConfig.legalName` in `lib/config.ts` and legal pages |
| 9 | **Privacy/grievance contact** | Data access, correction and deletion requests | Privacy Policy and `NEXT_PUBLIC_BUSINESS_EMAIL` |
| 10 | **Commission split approach** | The site says the one-time commission is shared, but not the exact percentage | `COMMISSION_TERMS` in `lib/content.ts` and the written placement agreement |
| 11 | **Replacement period and terms** | The site says terms follow the written agreement | Written agreement; optionally update `COMMISSION_TERMS` |
| 12 | **Confirmed fee guidance** | The ₹2,000–₹5,000 range is indicative only | `siteConfig.fees` in `lib/config.ts` |
| 13 | **Class frequency and duration** | Parents need to know what a monthly fee includes | Add to `lib/content.ts` or the How It Works / Fees section |
| 14 | **Demo policy** | The site says a demo may be arranged subject to availability. Confirm whether it is free, who attends and any conditions | How It Works, FAQs, `lib/content.ts` |
| 15 | **Tutor verification and document-retention policy** | Privacy and trust commitments | Privacy Policy, Terms, `VERIFICATION_STEPS` |
| 16 | **Refund/cancellation policy, if any** | Payment and placement expectations | Terms & Conditions, written agreement |
| 17 | **Business registration/GST details, if published** | Invoicing and legal accuracy | Footer/legal pages, only if applicable |
| 18 | **Google Search Console / analytics** | Optional launch setup | Add the verification tag or analytics after consent review |
| 19 | **Google Sheets deployment** | Needed to receive leads automatically | Follow section 5.1 and set the three `GOOGLE_SHEETS_*` variables |

Do **not** publish any of these until they are true and approved. The website must not state a physical office, a tutor count, results, ratings or guaranteed response times without real evidence.

---

## 11. Security and privacy notes

- The service-role key and Google Sheets webhook details are read only on the server. They are never imported by a client component or prefixed with `NEXT_PUBLIC_`.
- The two spreadsheets must stay private. The Apps Script web app is callable by anyone with its URL, but every request must include the shared secret, and the script rejects anything else.
- Google Sheets receives text fields only. Tutor document contents never go to Sheets.
- Both database tables have RLS enabled and no public policies. The service-role key bypasses RLS by design; keep it secret.
- The `tutor-documents` bucket is private. The app never generates public document URLs.
- Uploaded files are checked for extension, declared MIME type, size and magic bytes.
- Stored filenames are randomised; the original filename is kept only as private metadata.
- API routes check same-origin requests, apply size limits, a honeypot and per-IP rate limits.
- WhatsApp summaries omit the full home address and never include uploaded documents.
- `.env*` files and `.data/` are gitignored.
- If a secret is ever committed or shared, rotate it in Supabase and the hosting dashboard immediately.
- The privacy policy describes the current implementation. Review it against the business's actual practices before launch, especially document retention and third-party processors.

---

## 12. Project map

```text
app/                     Pages, API routes, metadata, sitemap, robots
  api/enquiries/         Parent enquiry endpoint
  api/tutor-applications/Tutor application + document upload endpoint
  blog/                  Blog index and dynamic posts
  home-tutor/[area]/     Locality pages (empty until published)
components/              Layout, UI, forms and SVG illustrations
lib/                     Business config, content, validation, SEO, storage helpers
public/images/           Supplied logo lockups and brand mark
scripts/                 One-off asset preparation helper
google-apps-script/      Apps Script webhook for the two Google Sheets
supabase/schema.sql      Optional database + private bucket setup
.data/                   Local development leads/uploads (gitignored, created on demand)
```

---

## 13. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| `npm` is blocked in PowerShell | Use `npm.cmd` |
| Build fails on `metadataBase` / URL | `NEXT_PUBLIC_SITE_URL` must be a full valid URL including `https://` |
| Contact buttons are missing | The matching environment variable is blank. This is intentional |
| Production form says "not connected yet" | No storage is configured. Add the three `GOOGLE_SHEETS_*` values (and/or Supabase), then redeploy |
| Google Sheet stays empty | Check the Apps Script deployment URL ends in `/exec`, the secret matches, `EXPECTED_TYPE` is correct, and the deployment is a current version. Apps Script errors are logged there under **Executions** |
| Tutor upload is rejected | Private document storage is not configured. Add Supabase, or submit the application without documents |
| Supabase insert fails | Re-run `supabase/schema.sql`; check RLS/bucket setup and that the service-role key is correct |
| Upload rejected | Only PDF/JPG/PNG, max 3 files, 5 MB each; the file content must match its extension |
| Docs seem missing after redeploy | Serverless filesystems are temporary. Use Supabase, not `.data/` |
| Changes to contact details do not appear | `NEXT_PUBLIC_*` values are build-time. Restart the dev server or redeploy |
| Sitemap shows localhost URLs | Set `NEXT_PUBLIC_SITE_URL` and rebuild |

---

## 14. Honest status of integrations

| Integration | Status |
| --- | --- |
| Website pages, navigation and responsive layout | Built and production build verified |
| Parent form validation and rate limiting | Built and locally tested |
| Tutor form validation, upload rejection and private local storage | Built and locally tested |
| Google Sheets parent/tutor webhooks | Code and Apps Script provided; **not tested against a live Google Sheet** because no Apps Script URL or secret was supplied |
| Supabase schema and private bucket | Provided; **not tested against a live Supabase project** because no credentials were supplied |
| WhatsApp links | Code ready; hidden until a real number is configured |
| Phone/email links | Code ready; hidden until real details are configured |
| Email/SMS notifications | Not implemented |
| Payments | Not implemented |
| Analytics/Search Console | Not configured |
| Custom domain/deployment | Not configured |

---

**Business name:** Advanta Home Tutions  
**Tagline:** Your Child's Success, Our Commitment  
**Primary city:** Varanasi, Uttar Pradesh, India
