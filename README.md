# MGC — Mbaeri Gospel Chinomso Portfolio

## Files
- `index.html` — main portfolio
- `certificate.html` — dedicated certificate viewing page
- `styles.css` — responsive styling, light/dark theme
- `script.js` — theme switcher, mobile navigation, current footer year
- `assets/profile.webp` — full portrait used in the profile
- `assets/favicon.webp` — portrait favicon

## Publish with GitHub Pages
1. Upload the complete contents of this folder to the root of your GitHub repository (not just `index.html`).
2. In repository Settings → Pages, select the branch and root folder.
3. Save and open the published GitHub Pages URL.

## Add your actual certificate PDF
Place the original W3Cx certificate PDF at:
`assets/w3cx-front-end-certificate.pdf`

The dedicated `certificate.html` page already links to that path for viewing and downloading. The Project Management certificate is marked in progress and is not presented as completed.

## Notes
- The portrait is displayed with `object-fit: contain` so the full head and face are not cropped.
- The site follows the visitor's system light/dark preference and includes a manual theme toggle.
- Update the contact details or role descriptions in `index.html` if anything changes.


## Interactive 3D hero background
The homepage uses the `threejs-components` cursor-tube module from jsDelivr in `tubes-background.js`. The effect is constrained to the hero area and uses muted champagne, copper, slate and navy colours. Visitors can move the pointer over the hero and click/tap its open background to cycle through curated palettes. The canvas uses `touch-action: pan-y` so normal vertical scrolling remains available on touch devices.

The 3D effect requires an internet connection to load the CDN module and WebGL support. If it cannot load, the portfolio remains usable with its normal background and existing animations. Devices configured for reduced motion and lower-power devices skip the WebGL effect.


## 3D background integration notes
- The animated tube canvas is intentionally limited to the homepage hero; it does not sit behind long-form sections where it could reduce reading contrast.
- The tube palette now follows the active light/dark theme, while the text system uses higher-contrast theme tokens.
- The palette control is a real button, so touch users can change colours without needing a mouse. The canvas keeps `touch-action: pan-y` to preserve vertical scrolling.
- The 3D module is dynamically loaded from jsDelivr. If WebGL, the CDN, or the visitor's data-saving / reduced-motion settings prevent loading, the normal hero remains visible.
- The module does not document a public disposal method, so the code avoids calling speculative cleanup methods.
