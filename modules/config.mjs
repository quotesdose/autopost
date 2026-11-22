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
    },
    pixelfed: {
        instance: "https://pixelfed.social",
        token: process.env.PIXELFED_TOKEN
    },
    tumblr: {
        blog: {
            name: "quotesdoseon"
        },
        consumer: {
            key: process.env.TUMBLR_CONSUMER_KEY,
            secret: process.env.TUMBLR_CONSUMER_SECRET
        },
        token: {
            key: process.env.TUMBLR_TOKEN_KEY,
            secret: process.env.TUMBLR_TOKEN_SECRET
        }
    }
}
