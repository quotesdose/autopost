import config from "../modules/config.mjs"
import content from "../modules/content.mjs"

import { writeFile } from "node:fs/promises"
import { createReadStream } from "node:fs"

import tumblr from "tumblr.js"

;(async function () {
    let client

    async function authenticate() {
        try {
            console.log("[Tumblr] Authenticating...")

            client = new tumblr.Client({
                consumer_key: config.tumblr.consumer.key,
                consumer_secret: config.tumblr.consumer.secret,
                token: config.tumblr.token.key,
                token_secret: config.tumblr.token.secret
            })

            console.log("[Tumblr] Successfully authenticated.")
        } catch (error) {
            console.error("[Tumblr] Authentication failed:", error)

            throw error
        }
    }

    async function post() {
        const quote = content.quote
        const tags = content.tags
        const image = content.image.portrait
        const url = content.url

        try {
            const media = "cache/media.png"

            await writeFile(media, image.buffer)

            const response = await client.createPost(config.tumblr.blog.name, {
                // state: "private",
                content: [
                    {
                        type: "image",
                        media: createReadStream(new URL("../" + media, import.meta.url)),
                        alt_text: image.alt
                    },
                    {
                        type: "text",
                        text: quote
                    }
                ],
                tags: tags,
                source_url: url
            })
            console.log(
                "[Tumblr] Post created:",
                `https://tumblr.com/${config.tumblr.blog.name}/${response.id}`
            )
        } catch (error) {
            console.error("[Tumblr] Failed to create post:", error)
            throw error
        }
    }

    await authenticate()
    await post()
})()
