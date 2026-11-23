# NHA Website

## Project structure

- `index.html` is the homepage.
- `pages/` contains the other site pages.
- `assets/images/` is organized by section: `home/`, `about/`, `media/`, `projects/`, and `tracking/`. Shared branding, footer, and highway images are under `shared/`; currently unused images are kept in `unused/`.
- `assets/documents/` contains site documents.
- `pages/downloads.html` organizes official NHA downloads by category and links to the NHA document listings.
- `pages/right-to-information.html` provides access to the NHA Right to Information documents in `assets/documents/`.
- `pages/tender-types.html` is the Active Tenders category page, published at `/pages/tender-types.html`.
- `css/style.css` contains shared site and responsive styles; `css/animations.css` contains shared motion and interaction styles.
- `css/section-browser.css` unifies the section-navigation layout used on Complaints, Travel Advisory, and Maintenance Works.
- `css/pages/` contains page-specific styles.
- `js/` contains site behavior and the static-site build script.
- `js/site-search.js` provides the reusable `<site-search-button>` component and cross-page search on every page.
- `js/downloads.js` provides keyboard-accessible category switching on the Downloads page.
- `js/testimonial-slider.js` controls the manual testimonial slider on the homepage.

## Build and preview

Run `node js/build-pages.mjs` to build a preview in your system temporary folder (`%TEMP%\nha-landingpage-preview` on Windows). Open `index.html` there to preview the built site. You can pass a different output directory as the first argument. The GitHub Pages workflow supplies its own temporary output directory before deployment.
