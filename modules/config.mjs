import "dotenv/config"

export default {
    bluesky: {
        service: "https://bsky.social",
        identifier: "quotesdose.bsky.social",
        password: process.env.BLUESKY_PASSWORD
    },
    mastodon: {
        instance: "https://mastodon.social",
        token: process.env.MASTODON_TOKEN
    }
}
