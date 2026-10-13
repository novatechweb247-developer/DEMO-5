# Master Public Website Demo

## Goal

Build a polished, content-driven five-page business website foundation using clearly labeled demo information. The finished public site will be reusable across many industries by replacing centralized copy, media, branding, services, and contact details rather than rebuilding layouts.

## Visual direction

- Editorial modern business aesthetic: warm white surfaces, deep ink typography, muted olive accents, and restrained clay highlights.
- Pair a distinctive serif display face with a clean sans-serif body face for a premium but industry-neutral character.
- Use a cohesive set of generated architectural, lifestyle, material, and service imagery with careful cropping and image overlays; no brand marks or text baked into images.
- Favor generous whitespace, crisp grid layouts, subtle borders/shadows, and modest corner rounding instead of glass effects, oversized text, or excessive cards.
- Add subtle fades, controlled image scale, and refined hover transitions with reduced-motion support.

## Site structure

- Create a centralized typed demo-content module covering business identity, navigation, exactly three hero slides, homepage sections, services, gallery, about, contact, social links, footer, and per-page SEO.
- Create a simple media-reference layer so every image is selected through content data and can later be replaced by stored media references.
- Build reusable site-wide components: header, accessible mobile menu, footer, buttons, section heading, page banner/breadcrumb, image presentation, service/value cards, CTA band, social links, and contact details.
- Keep all five public destinations as real routes: `/`, `/about`, `/services`, `/gallery`, and `/contact`.

## Pages and interactions

- **Home:** three-slide hero with automatic rotation, pause/reset behavior, manual dots and arrows, about preview, services preview, editorial gallery, value section, CTA, and contact/location preview.
- **About:** page banner, introduction, story, visual editorial section, values, and CTA.
- **Services:** page banner, reusable service grid, expanded alternating service details, and CTA.
- **Gallery:** page banner and responsive editorial image composition with useful descriptive labels but no unnecessary filters.
- **Contact:** page banner, clearly marked demo phone/email/location/WhatsApp/social details, accessible enquiry form fields, validation-ready required inputs, and an explicit note that submission is not connected yet.

## Responsive and accessibility work

- Design mobile layouts independently where needed, including compact navigation, stacked actions, reordered image/text sections, stable image ratios, and touch-friendly slider controls.
- Use semantic landmarks, logical headings, meaningful alt text, visible focus states, labelled form fields, keyboard-operable menus/slider controls, and adequate contrast.
- Lazy-load noncritical images and avoid unnecessary client-side logic.

## Metadata and verification

- Add unique demo title, description, Open Graph title/description, `og:type`, and Twitter card metadata to every content route.
- Verify all navigation and calls-to-action, the exactly-three-slide behavior, mobile menu, contact form UI, image rendering, and all five routes in desktop and phone-sized browser checks.
- Check for overflow, overlap, console/runtime errors, missing routes, broken links, and build diagnostics.

## Technical details

- Stay within the existing TanStack Start, Tailwind v4, shadcn, and Lucide setup.
- Use semantic design tokens in the global stylesheet and the existing shared Button control for interactive commands.
- Keep the project frontend-only: no login, Admin Center, database, fake persistence, media library, or backend submission.
- Record the centralized content/media architecture as the project convention for future assistants.
