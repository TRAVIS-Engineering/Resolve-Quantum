# ResolveQuantum Website

Single‑page marketing site for ResolveQuantum insurance appraisal services.

## Structure
- `index.html` – main site (static HTML with shared CSS/JS)
- `assets/images/` – site images and sample documents

## Local Preview
```bash
cd resolvequantum-site
python3 -m http.server 5173 --bind 127.0.0.1
```
Then open http://localhost:5173

## Search and performance maintenance

See [the search visibility checklist](docs/search-visibility.md) for completed work, account-dependent follow-ups, metadata/schema maintenance and verification. Styles live in `assets/css/site.css`; deferred interactions in `assets/js/site.js`. Optimized image variants are in `assets/images/optimized/`; original source images remain intact. Keep `sitemap.xml` synchronized with real page routes.
