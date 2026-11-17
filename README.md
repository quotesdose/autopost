# Auto Post

Share Quotes Dose content to social media automatically.

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/en)** 24.x or later
- **[npm](https://npmjs.com)** 11.x or later

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/quotesdose/autopost.git
   cd autopost
   ```

2. **Set up the project:**
   ```bash
   npm run setup
   ```

## Make It Yours

Create a `.env` file in the project root, alongside `node_modules`, and add:

```
BLUESKY_PASSWORD=YOUR_APP_PASSWORD
MASTODON_TOKEN=YOUR_TOKEN
```

Get `BLUESKY_PASSWORD` from your [Bluesky app passwords page](https://bsky.app/settings/app-passwords) and `MASTODON_TOKEN` from your [Mastodon applications page](https://mastodon.social/settings/applications).

Take a look at `modules/config.mjs` too if you want to change the default social instances.

## Start Posting

Run `npm run post` and check your socials.
