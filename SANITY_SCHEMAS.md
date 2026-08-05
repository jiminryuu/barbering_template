# Sanity Schema Types & How They Populate the Website

This doc explains each content type in Sanity Studio and exactly where that content appears on your barber site.

---

## 1. **Barber** (`barber`)

**In Studio:** **Barber** in the structure (single document).

**Fields:**
- **Name** — Barber/shop name (required).
- **Bio** — Optional text (not currently shown on the homepage; can be used later).
- **Image** — One image (e.g. hero background).
- **Specialties** — List of strings (not currently shown; can be used later).

**On the website:**
- **Hero section** (top of the page): the barber **image** is used as a full-bleed, blurred grayscale background.
- The **name** is used in the hero tagline: *“Your style, redefined by [name].”*

**Usage tip:** Create **one** Barber document. The site uses the first one (`barber[0]`). Publish after editing so the hero updates.

---

## 2. **Service** (`service`)

**In Studio:** **Service** in the structure. Create one document per offering (e.g. “Classic Cut”, “Beard Trim”).

**Fields:**
- **Name** — Service name (required).
- **Description** — Short text.
- **Price** — Number (required, ≥ 0). Shown with a `$` prefix.
- **Duration** — Minutes (required, ≥ 1). Shown as “X Minutes”.
- **Image** — Optional (not currently displayed on the homepage grid).

**On the website:**
- **Services section** (`#services`): a grid of cards. Each **published** Service document becomes one card showing:
  - Number label (01, 02, …)
  - **Price**
  - **Name**
  - **Description**
  - **Duration** (e.g. “30 Minutes”).

**Usage tip:** Add as many services as you want. Order in the grid follows Sanity’s order. Publish each service to see it on the site.

---

## 3. **Before & After Gallery** (`gallery`)

**In Studio:** **Before & After Gallery** in the structure. One document = one before/after pair.

**Fields:**
- **Title** — Optional caption above the slider.
- **Before Image** — Image (required for the block to show).
- **After Image** — Image (required for the block to show).

**On the website:**
- **Transformation / Gallery section** (`#gallery`): each **published** gallery document is one **BeforeAfter** block — a draggable before/after slider with **title** above and “Before / Drag Slider / After” below. If either image is missing, that document is skipped.

**Usage tip:** For each entry, add both before and after images and a title, then publish. New entries appear in order in the gallery section.

---

## 4. **Lookbook (Styles)** (`lookbook`)

**In Studio:** **Lookbook (Styles)** in the structure. One document = one “style” (e.g. “High Fade”, “Textured Crop”).

**Fields:**
- **Style Name** — Name of the style.
- **Description** — Text shown under the style (quiz result and 360 section).
- **Hair Option / Gender** — Dropdown for `Masculine` or `Feminine`. Used to filter styles in the **360 Lookbook**.
- **360 View Images** — Multiple images (different angles). Used by **StyleViewer360** for the “drag to rotate” experience.
- **Is Default/Signature Style?** — If no quiz answers match any style, the quiz falls back to the style marked default, or the first lookbook document.

**On the website:**
- **360° Lookbook section** (`#lookbook-360`): user can toggle between Masculine and Feminine icons to filter the styles shown. A dropdown allows selecting a specific style name to view its 360 images.
- **Style Quiz section** (`#quiz`): user answers questions that map to specific styles. The result shows **styleName**, **description**, and **StyleViewer360** with that style’s **images**.

**Usage tip:**  
- Choose the correct gender option for each style to ensure it appears in the right category.
- Add several 360 images per style for a smooth viewer.  
- Mark one style as “Is Default” so the quiz always has a result.  
- Publish lookbook documents so they appear in both the 360 section and the quiz.

---

## Quick reference: Schema → Page section

| Schema    | Homepage section      | Main usage |
|----------|------------------------|------------|
| **Barber** | Hero                  | Background image, name in tagline |
| **Service** | Services grid         | Cards: name, price, description, duration |
| **Gallery** | Transformation (#gallery) | Before/after sliders |
| **Lookbook** | 360 Lookbook (#lookbook-360) + Style Quiz (#quiz) | 360 viewers + quiz results (gender filter, default) |

All content is fetched server-side; only **published** documents are shown. After changing content in Studio, **Publish** and refresh the site (or wait for revalidation) to see updates.
