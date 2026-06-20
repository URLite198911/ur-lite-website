# UR Lite Website

This repository now includes a static product website for UR Lite at `universalreaderlite.com`.

UR Lite is a lightweight Windows reader for PDF, EPUB, DOCX, TXT, CBR, and CBZ files. The site is plain HTML, CSS, and minimal JavaScript. It is intended for Cloudflare Pages or GitHub Pages and does not require React, Next.js, WordPress, a database, a login system, or backend code.

## Website File Structure

```text
/
|-- index.html
|-- about.html
|-- readme.html
|-- feedback.html
|-- privacy.html
|-- support.html
|-- assets/
|   |-- css/
|   |   `-- style.css
|   |-- js/
|   |   `-- main.js
|   `-- images/
`-- README.md
```

## Preview Locally

Open `index.html` directly in a browser. No build step is required.

## Deploy to Cloudflare Pages

1. Push the website files to a GitHub repository.
2. In Cloudflare Pages, create a new project from that repository.
3. Use no framework preset.
4. Leave the build command blank.
5. Set the output directory to `/` or the repository root.
6. Deploy, then connect the custom domain `universalreaderlite.com`.

## Deploy to GitHub Pages

1. Push the website files to a GitHub repository.
2. In the repository settings, open Pages.
3. Set the source to the main branch.
4. Set the folder to `/root`.
5. Save and connect `universalreaderlite.com` using GitHub Pages custom domain settings.

## Replace Before Launch

- UR Lite is temporarily offered as a free GitHub preview download while Lemon Squeezy store activation is under review.
- After Lemon Squeezy approval is complete, replace the `Support Development` coming-soon button in `index.html` with the live Lemon Squeezy checkout link.
- Replace the `Leave an Honest Rating` placeholder href in `feedback.html` with the public review link after the app is listed on the chosen marketplace or review platform.
- Replace `support@universalreaderlite.com` if the support email changes.

## Official Helper Software Links

Users should download helper software only from the official websites below.

- LibreOffice: https://www.libreoffice.org/download/
- 7-Zip: https://www.7-zip.org/download.html
- WinRAR: https://www.win-rar.com/download.html?L=0
