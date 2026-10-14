# Fitzroy & Co. website

Static site for fitzroyadvisory.com (plain HTML, CSS, and JavaScript; no build step).

## Structure

| Page | File |
|---|---|
| Home | `index.html` |
| Courses hub | `courses.html` |
| Course 1: The Price of Money (includes the Capital Ledger at `#ledger`) | `price-of-money.html` |
| Course 2: Value Before Valuation (waitlist page) | `value-before-valuation.html` |
| Course 3: The Last Term Sheet, "The Time to Exit" (waitlist page) | `the-last-term-sheet.html` |
| Advisory | `advisory.html` |
| About | `about.html` |
| Not found | `404.html` |

Other files: `styles.css`, `site.js`, `ledger-math.js` (the Ledger's calculation logic), `config.js` (the one file to edit for links and settings), PNG images (logo mark, icons, social share image), `sitemap.xml`, `robots.txt`, `CNAME`, `.nojekyll`.

There is no Writing section yet. Add it once there are several posts to publish.

## Before launch: fill in `config.js`

| Setting | What goes there |
|---|---|
| `contactEmail` | The address shown on the site (set up Email Routing in Cloudflare or Google Workspace first) |
| `bookingUrl` | Calendly / Cal.com page for the 30-minute session. Empty = opens a pre-filled email |
| `mavenLightningUrl` | The Lightning Lesson page on Maven. Empty = jumps to the email signup |
| `mavenCourseUrl` | The Price of Money cohort page or waitlist on Maven. Empty = jumps to the email signup |
| `valueWaitlistUrl` | Value Before Valuation waitlist. Empty = jumps to the email signup |
| `exitWaitlistUrl` | The Last Term Sheet waitlist. Empty = jumps to the email signup |
| `emailFormAction` | Your email service's form POST address (Kit, MailerLite, Buttondown). Empty = shows a "not open yet" message |
| `emailFieldName` | The email field name your service expects (usually `email`) |
| `emailInterestField` | Optional. A hidden field name your service accepts for tags or groups. Each signup form then sends `general`, `price-of-money`, `value`, or `exit` so one list can be segmented by interest |

## Deploy on GitHub Pages

1. Create a public GitHub repository and upload every file in this folder to the root of the `main` branch.
2. Repository Settings > Pages: deploy from the `main` branch, root folder. The `CNAME` file already names the custom domain.
3. In Cloudflare DNS for fitzroyadvisory.com: four `A` records for the apex (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `CNAME` for `www` pointing to `<your-github-username>.github.io`. Set them to DNS only (grey cloud) until GitHub has issued the HTTPS certificate.
4. Back in Settings > Pages, tick Enforce HTTPS once it becomes available.

## Maven links

Point the Maven lead magnet at `https://fitzroyadvisory.com/price-of-money.html#ledger`.

## Review before publishing

The legal footer, the "What this is not" note on the Advisory page, and the "Education, not deal work" notes on the exit pages are conservative drafts. Have a securities attorney confirm the wording, especially for the exit-related pages, and check your SMU outside-activity disclosure requirements. Have the three course titles cleared for trademark, in particular "The Last Term Sheet" given Fortune's Term Sheet newsletter.
