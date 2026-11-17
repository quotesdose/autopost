import config from "../modules/config.mjs"
import content from "../modules/content.mjs"

import { BskyAgent, RichText } from "@atproto/api"

;(async function () {
    const agent = new BskyAgent({
        service: config.bluesky.service
    })

    async function authenticate() {
        try {
            console.log("[Bluesky] Authenticating...")
            await agent.login({
                identifier: config.bluesky.identifier,
                password: config.bluesky.password
            })
            console.log("[Bluesky] Successfully authenticated.")
        } catch (error) {
            console.error("[Bluesky] Authentication failed:", error)

            throw error
        }
    }

    async function post() {
        const text = content.text
        const image = content.image.portrait

        const rt = new RichText({
            text: text
        })

        await rt.detectFacets(agent)

        const uploadResponse = await agent.uploadBlob(image.buffer, {
            encoding: image.encoding
        })

        try {
            const response = await agent.post({
                $type: "app.bsky.feed.post",
                text: rt.text,
                facets: rt.facets,
                embed: {
                    $type: "app.bsky.embed.images",
                    images: [
                        {
                            image: uploadResponse.data.blob,
                            alt: image.alt,
                            aspectRatio: image.dimensions
                        }
                    ]
                },
                createdAt: new Date().toISOString()
            })

            console.log(
                "[Bluesky] Post created:",
                `https://bsky.app/profile/${config.bluesky.identifier}/post/${response.uri.split("/").pop()}`
            )
        } catch (error) {
            console.error("[Bluesky] Failed to create post:", error)
            throw error
        }
    }

    await authenticate()
    await post()
})()
