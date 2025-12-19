# Personal Website

This repo contains a single-page site for showcasing Anuj Panchal's academic achievements, education, projects, career journey, and recent LinkedIn activity.

## Local development

1. Open `index.html` in a browser—no build step required.
2. Edit `styles.css` and `script.js` to customize the look and LinkedIn data. Replace the placeholder `linkedInPosts` array in `script.js` with your own embed URLs.

## Updating the LinkedIn carousel

- Copy the share link of a LinkedIn post, then open the "Embed this post" option on LinkedIn to grab the `urn:li:share:########` value.
- In `script.js`, update the `linkedInPosts` array with the embed URLs in the format `https://www.linkedin.com/embed/feed/update/urn:li:share:<ID>`.
- Optionally add a short caption for each entry; it appears below the embedded post inside the carousel card.
- For automated updates, expose a secure JSON endpoint that returns the embed URLs and fetch it in place of the static array.

## Hero background slideshow

- Edit the `heroImageSources` array near the top of `script.js` to point to your own hosted images (local files, CDN, or asset pipeline).
- The script preloads them, fades them in sequence, and loops every 6 seconds. Remove or add entries to adjust the slideshow length.

## Deploying on GoDaddy

GoDaddy offers a simple static hosting flow when you manage DNS there. Use whichever option fits you best:

### Option 1: GoDaddy Website Builder (fastest)
1. Log in to GoDaddy and open *My Products* → *Websites + Marketing*.
2. Create a new site or edit the existing one tied to your domain.
3. In the site editor, select *Settings* → *Advanced* → *Upload custom site*.
4. Upload the three files in this repo (`index.html`, `styles.css`, `script.js`) as-is. The builder will host them directly.

### Option 2: GoDaddy cPanel/Hosting
1. Purchase or use an existing cPanel Linux hosting plan (from *My Products*).
2. Once provisioned, open cPanel → *File Manager*.
3. Navigate to `public_html` (or the document root for a subdomain).
4. Upload `index.html`, `styles.css`, and `script.js`. You can upload a ZIP via File Manager and extract it, or use SFTP with the credentials under *FTP Accounts*.
5. Ensure `index.html` sits at the root of `public_html`.
6. Visit your domain to verify the site loads.

### Option 3: External hosting + GoDaddy DNS
1. Host the static site on a platform like GitHub Pages, Netlify, or Vercel.
2. Note the target hostname/goals (e.g., `yourname.netlify.app` or the platform's A/AAAA records).
3. In GoDaddy, open *Domains* → your domain → *DNS*.
4. Create `A` records (or `CNAME` for subdomains) that point to the hosting provider per their instructions.
5. Wait for DNS propagation (often <1 hour) and test the domain.

## Optional automation

- Store your files in a Git repository (this folder) and publish through CI/CD to your hosting provider.
- Use GitHub Actions (or similar) to run HTML/CSS linting and then deploy on every push to `main`.
