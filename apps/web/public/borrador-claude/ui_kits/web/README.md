# Mandioca · Web UI Kit

An interactive marketing site that flips between the two sub-brands.

- **`index.html`** — mounts the site; loads `styles.css`, the DS bundle, Lucide
  icons (CDN) and `site.jsx`.
- **`site.jsx`** — `Nav`, `Hero`, `Services`, `Roster`, `Footer` + the
  `BRANDS` content model. The brand toggle in the nav swaps colours, copy and
  illustration across the whole page via `data-brand`.

Composes the design-system primitives (`Button`, `Badge`, `Card`, `Eyebrow`,
`Avatar`, `Input`, `Lockup`, `MixedTitle`) — it does not re-implement them.

**Records** renders a black hero with yellow accents; **Academy** a green hero.
Both sit on the warm `--paper` ground. Icons are Lucide (`data-lucide`).
