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
    },
    substack: {
        user: {
            agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36"
        },
        cookie: {
            sid: process.env.SUBSTACK_COOKIE_SID,
            expires: "2027-02-21T15:06:05.101Z"
        }
    }
}
