# Carrie Kim, IBCLC: site

Static site meant to replace the current Squarespace site at carriekimibclc.com.
Built from the brand identity work in the sibling `carrie-kim-ibclc-brand` repo
(mark, palette, typography, The Thread pattern).

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Cache-busting CSS and JS

`assets/css/styles.css` and `assets/js/main.js` are linked with a `?v=<hash>`
query string on every page. GitHub Pages sits behind a CDN that can serve a
stale cached copy of these files for a while after a push, even through a
browser hard-refresh; changing the query string forces a fresh fetch. **Bump
the `?v=` value on all five HTML files whenever either file changes**, or a
real fix can appear to not have deployed.

## Before this replaces the live site

- ~~Contact form isn't wired up.~~ Removed. It had no submission handler and
  was silently failing on submit; the existing "Email Carrie" mailto button
  on the same page already covers this reliably with no setup required. If
  an in-page form is wanted later, it needs a real backend (Formspree,
  Netlify Forms, or similar), which requires signing up with Carrie's email,
  something only she or the site owner can do.
- ~~Booking links point at the old Squarespace `/appointments` page.~~ Fixed:
  every "Book a Consult" link now points at Carrie's real IntakeQ booking page
  (`curanatalhealth.intakeq.com`).
- **No phone number or physical address is published anywhere**, matching the
  current live site. If Carrie wants either listed (for local SEO, a phone number
  in particular helps), add it to the footer and to the JSON-LD in `index.html`.
- **Photos are reused from the earlier prototype repos.** Fine for now; swap for
  final licensed and approved photography before launch.

## Structure

```
index.html            Home
services.html         Prenatal / Newborns / Older Babies, matches Carrie's real
                       services page structure
about.html             Bio, training, philosophy
faq.html                FAQPage schema included
contact.html
assets/css/styles.css  Shared design system (tokens match brand/identity/*.md)
assets/js/main.js      Mobile nav + The Thread scroll-triggered draw-in
assets/img/            Mark (3 colorways) + placeholder photography
sitemap.xml, robots.txt
```

## SEO notes

Each page has its own title, meta description, canonical URL, Open Graph tags, and
JSON-LD structured data: MedicalBusiness and Person/credential on Home, FAQPage on
the FAQ page, BreadcrumbList everywhere. See `brand/seo-strategy.md` in the brand
repo for the full research and reasoning behind these choices.
