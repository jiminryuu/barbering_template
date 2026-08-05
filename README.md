# Barber Template (Next.js + Sanity)

Modular, single-client barber website template with CMS-driven theming.

## Stack
- Next.js App Router
- Tailwind CSS
- Sanity Studio + Content Lake
- Framer Motion

## Environment Variables
Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-12
NEXT_PUBLIC_SITE_NAME=Barber.Co
SANITY_API_READ_TOKEN=your_server_read_token_optional
```

## Local Development
```bash
npm install
npm run dev
```

Studio is available at `/studio`.

## Content Model
- `siteSettings` (singleton): brand, navigation, hero/footer copy, font preset, light/dark palettes, section variants.
- `barber`, `service`, `gallery`, `lookbook`: section content docs.
- Content docs include optional `site` reference for phased migration compatibility.

## How To Manage The Site
1. Open Sanity Studio (`/studio`).
2. Edit `Site Settings` to control:
   - Brand name and booking URL
   - Navigation and social links
   - Hero/footer copy
   - Font preset (`classic`, `editorial`, `bold`)
   - Theme palettes for `light` and `dark`
   - Section visual variants
3. Edit `service`, `gallery`, `lookbook`, and `barber` documents to change page content.
4. Use the frontend mode toggle to verify dark/light behavior.

## One-Project-Per-Client Workflow
1. Create a dedicated Sanity project for each client.
2. Deploy this codebase once per client (separate deployment/project).
3. Set that deployment's Sanity env vars to the client project.
4. Invite that client as a Sanity project member so they can manage only their own site.
5. Repeat for each new client.
