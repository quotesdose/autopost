import config from "../modules/config.mjs"
import content from "../modules/content.mjs"

;(async function () {
    const text = content.text
    const image = content.image.portrait

    try {
        const form = new FormData()

        form.append("file", new Blob([image.buffer], { type: image.encoding }))
        form.append("description", image.alt)

        const uploadResponse = await fetch(`${config.pixelfed.instance}/api/v2/media`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${config.pixelfed.token}`
            },
            body: form
        })

        const media = await uploadResponse.json()

        const statusResponse = await fetch(`${config.pixelfed.instance}/api/v1/statuses`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${config.pixelfed.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: content.text,
                media_ids: [media.id],
                visibility: "public"
            })
        })

        const status = await statusResponse.json()

        console.log("[Pixelfed] Post created:", status.url)
    } catch (error) {
        console.error("[Pixelfed] Failed to create post:", error)
        throw error
    }
})()
