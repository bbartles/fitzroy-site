# Fitzroy & Co. website

Static site for fitzroyadvisory.com (plain HTML, CSS, and JavaScript; no build step).

## Files
- `index.html`, `price-of-money.html` (includes the Capital Ledger at `#ledger`), `advisory.html`, `about.html`, `404.html`
- `styles.css`, `site.js`, `ledger-math.js` (the Ledger's calculation logic)
- `config.js`: **the one file to edit** for links and settings
- `assets/`: logo mark, icons, social share image

## Before launch: fill in `config.js`
| Setting | What goes there |
|---|---|
| `contactEmail` | The address shown on the site (set up in Google Workspace first) |
| `bookingUrl` | Calendly / Cal.com page for the 30-minute session. Empty = opens a pre-filled email |
| `mavenLightningUrl` | The Lightning Lesson page on Maven. Empty = jumps to the email signup |
| `mavenCourseUrl` | The cohort page or waitlist on Maven. Empty = jumps to the email signup |
| `emailFormAction` | Your email service's form POST address (Kit, MailerLite, Buttondown). Empty = shows a "not open yet" message |
| `emailFieldName` | The email field name your service expects (usually `email`) |

## Deploy on GitHub Pages
1. Create a GitHub repository and upload every file in this folder to the root of the main branch.
2. Repository Settings > Pages: deploy from the `main` branch, root folder. The `CNAME` file already names the custom domain.
3. In Cloudflare DNS for fitzroyadvisory.com, add the GitHub Pages records (confirm the current addresses in GitHub's custom-domain docs): four `A` records for the apex domain, and a `CNAME` for `www` pointing to `<your-github-username>.github.io`. Set them to **DNS only** (grey cloud) until GitHub has issued the HTTPS certificate.
4. Back in Settings > Pages, tick **Enforce HTTPS** once it becomes available.

## Maven links
Point the Maven lead magnet at `https://fitzroyadvisory.com/price-of-money.html#ledger`.

## Review before publishing
The legal footer and the "What this is not" note on the Advisory page are conservative drafts.
