import config from "../modules/config.mjs"
import content from "../modules/content.mjs"

import { createRestAPIClient } from "masto"

;(async function () {
    let masto

    async function authenticate() {
        try {
            console.log("[Mastodon] Authenticating...")
            masto = createRestAPIClient({
                url: config.mastodon.instance,
                accessToken: config.mastodon.token
            })
            console.log("[Mastodon] Successfully authenticated.")
        } catch (error) {
            console.error("[Mastodon] Authentication failed:", error)

            throw error
        }
    }

    async function post() {
        const text = content.text
        const image = content.image.portrait

        try {
            const attachment = await masto.v2.media.create({
                file: new Blob([image.buffer, { type: image.encoding }]),
                description: image.alt
            })

            const status = await masto.v1.statuses.create({
                status: text,
                visibility: "public",
                mediaIds: [attachment.id]
            })

            console.log("[Mastodon] Post created:", status.url)
        } catch (error) {
            console.error("[Mastodon] Failed to create post:", error)
            throw error
        }
    }

    await authenticate()
    await post()
})()
