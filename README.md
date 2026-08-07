# Carrie Kim, IBCLC: site

Static site meant to replace the current Squarespace site at carriekimibclc.com.
Built from the brand identity work in the sibling `carrie-kim-ibclc-brand` repo
(mark, palette, typography, The Thread pattern).

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Before this replaces the live site

- **Contact form isn't wired up.** `contact.html` has a real-looking form with no
  submission handler. Needs Formspree, Netlify Forms, or an equivalent before
  launch.
- **Booking links point at the old Squarespace `/appointments` page.** That's
  intentional for now, since Carrie's real booking flow lives there, but once this
  site takes over the domain, that link needs to point wherever the booking system
  actually ends up living.
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
