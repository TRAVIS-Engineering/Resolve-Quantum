# Resolve Quantum search visibility and domain checklist

This is a single-page site plus a website privacy notice. Service-section anchors are not separate pages and must not be listed as separate sitemap URLs. Preserve the current identity: Resolve Quantum, +1-250-895-9381, Admin@resolvequantum.ca, services across Canada. Do not reuse TRAVIS offices, ratings, reviews or awards.

## Implemented in this update

- Explicit robots.txt permissions for Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and other crawlers, plus the sitemap URL.
- Sitemap for the homepage and privacy page; unique page titles/descriptions and canonical URLs.
- HTTPS enforcement enabled through the existing GitHub Pages configuration. The canonical hostname is www.resolvequantum.ca. DNS already points to GitHub Pages and was preserved.
- Organization, WebSite, WebPage and ten Service JSON-LD entries based on visible site content. No invented office addresses, review ratings or social profiles. Office-specific LocalBusiness/ProfessionalService data remains dependent on verified addresses.
- Open Graph/X previews and real brand favicon/touch icon using the existing logo.
- Static service-area copy; all major sections and FAQ remain readable without JavaScript. Six service cards use native links. One H1 and a main landmark per page, plus skip link and focus styling.
- WebP variants, explicit image dimensions, below-fold image/frame lazy loading and deferred map scripts/data. Originals retained. CSS and JavaScript extracted into separately cached files. Map loading no longer obscures the entire page.
- Existing phone/email links retained; added footer website/phone links, privacy links and a direct Google Forms fallback link. Removed unused fake-submit logging and guarded a stale testimonial timer after its markup had already been removed.
- Website privacy notice describes observed hosting, form and embedded providers. It is a site-specific transparency notice, not certification of PIPEDA compliance or a substitute for the business's full client-file retention/privacy procedures.
- First-party contact-intent events (`resolve:contact`, detail.action = phone_click/email_click/open_form). These contain no visitor identity or form content and are not transmitted. They are integration hooks, not active GA4 tracking.

## Account/business dependencies still open

1. Google Search Console: verify authorized ownership/access and submit https://www.resolvequantum.ca/sitemap.xml. An existing DNS Google verification token alone does not establish which account owns a property.
2. Bing Webmaster Tools: verify property access and submit the same sitemap.
3. GA4: obtain/use the real property/measurement ID and confirm the applicable consent setup before loading tags. Do not invent an ID or claim baseline/lead tracking is live. Update the privacy notice when analytics is enabled.
4. Successful form submission tracking, an “I am a” field and confirmation/thank-you behavior require owner access to the existing Google Form. The cross-origin iframe cannot reliably report successful submissions to this static parent page. Do not count a form-open click as a submitted lead. Do not add a one-business-day response promise without business confirmation.
5. Official business/profile links and actual office addresses are needed for sameAs/local-office schema and directory reconciliation. Do not substitute TRAVIS locations.
6. Mail sender inventory and Google Workspace DKIM configuration are required before strict SPF/DMARC enforcement. Alex is unsure whether other services send mail. The intended initial SPF authorizes Google but leaves unknown senders neutral (`?all`); DMARC should remain monitoring (`p=none`) until legitimate sender alignment is verified. Account-generated DKIM keys must come from Workspace admin settings.
7. Resolve-specific review/award/insurance evidence and any revised copy must come from actual business sources. Existing service descriptions and Derek Firth's existing credential wording were preserved.
8. The business should review the privacy contact, retention procedures and any additional client-file practices that need a fuller policy.

## Items from the TRAVIS audit that do not transfer

- TRAVIS office/phone discrepancies, its placeholder project addresses, its logo strip, its Google review carousel/ratings/awards, Storm Team fixes and Apple domain verification are outside this update.
- No Cloudflare migration is needed for these changes; retain the existing GitHub Pages delivery/DNS workflow.
- No duplicate SPF record, invented DKIM selector, mail-route change or blanket DNS cleanup.

## Verification and maintenance

Test desktop/mobile layout, no-JavaScript visibility, map rendering, native links, report pagination, FAQ, form fallback, reduced motion, schema JSON and sitemap XML. The existing DJI iframe reports a provider-side `jX` error in the automated browser; first-party page scripts pass and a direct model link is provided. Do not represent this as a site-owned script failure or claim DJI's underlying viewer has been repaired.

QA receipts and scripts: /home/foisey/Documents/resolve-quantum-seo-20261102/ and the matching foiseydesk directory. Browser checks run on foiseydesk, bound to an ephemeral loopback port, not on the shared Spark model host. Publish by pushing main in TRAVIS-Engineering/Resolve-Quantum; GitHub Pages builds from the repository root. No new backend service is introduced.

Referenced images: 22,983,192 → 2,926,070 bytes (87.3% smaller). This is image payload reduction, not a claimed Lighthouse score.
