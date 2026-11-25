# MGC portfolio — 3D background integration

## Component and placement
The effect belongs only in the homepage hero (`#home`). It is a decorative canvas behind the introduction and portrait, not a site-wide background. This preserves the calm editorial layout across About, Expertise, Experience, Education and Contact.

## Reference implementation review
- `children` / overlay content: useful pattern, retained as normal HTML layered above the canvas.
- `className`: not needed in this static HTML/CSS implementation.
- `enableClickInteraction`: retained as an explicit interaction, but constrained to the canvas and a dedicated palette button so links and controls are not accidentally affected.
- `isLoaded` / `tubesRef`: replaced with module-scoped state because this site is not React.
- `framer-motion`: unnecessary here; existing CSS transitions and reveal animations already provide motion.
- `touchAction: none`: not retained because it blocks normal mobile scrolling. The canvas uses `touch-action: pan-y`.
- Cleanup: no undocumented `destroy()` call is made. Event listeners owned by this integration are removed on `pagehide`.

## Improvements made
1. Three curated palettes for each theme; switching light/dark updates the tube and light colours.
2. Higher-contrast gold tokens and a theme-aware wash behind hero copy keep text legible over the animated background.
3. A visible, keyboard-accessible palette button supports phone and tablet visitors; desktop visitors can also click open canvas space.
4. The effect is skipped when reduced motion or data-saving is enabled. Small screens use lower light intensity.
5. The low-core-count exclusion was removed so capable phones and tablets are not automatically denied the effect.
6. The responsive breakpoints already present in `styles.css` were retained; focus-visible styling was added for keyboard users.

## Validation
- JavaScript syntax checked with `node --check` for `script.js` and `tubes-background.js`.
- The archive includes the original profile assets and certificate page.
- A live browser/WebGL visual test was not performed in this environment. The 3D library still requires an internet connection and WebGL support; the site falls back to its existing static hero if loading fails.
