import config from "../modules/config.mjs"
import content from "../modules/content.mjs"

import dayjs from "dayjs"

;(async function () {
    const quote = content.quote
    const image = content.image.portrait
    const schedule = dayjs().add(Math.ceil(Math.random() * 17), "minute")["$d"]

    try {
        const headers = {
            "User-Agent": config.substack.user.agent,
            "Content-Type": "application/json",
            "Cookie": `substack.sid=${config.substack.cookie.sid}`
        }

        const uploadResponse = await fetch("https://substack.com/api/v1/image", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                image: `data:${image.encoding};base64,${Buffer.from(image.buffer).toString("base64")}`
            })
        })

        const media = await uploadResponse.json()

        const attachmentResponse = await fetch("https://substack.com/api/v1/comment/attachment", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                url: media.url,
                type: "image"
            })
        })

        const attachment = await attachmentResponse.json()

        // Posting directly to `/api/v1/comment/feed` isn't working because of a 403 error. The alternative is to save it as a draft and publish it after a delay.

        const draftResponse = await fetch("https://substack.com/api/v1/comment/draft", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                bodyJson: {
                    type: "doc",
                    attrs: {
                        schemaVersion: "v1",
                        title: null
                    },
                    content: quote.split("\n").map((line) => {
                        return {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: line
                                }
                            ]
                        }
                    })
                },
                attachmentIds: [attachment.id],
                replyMinimumRole: "everyone"
            })
        })

        const draft = await draftResponse.json()

        const noteResponse = await fetch(`https://substack.com/api/v1/feed/comment/${draft.id}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                bodyJson: draft.body_json,
                attachmentIds: draft.attachments.map((attachment) => attachment.id),
                replyMinimumRole: draft.reply_minimum_role,
                trigger_at: schedule
            })
        })

        const note = await noteResponse.json()

        console.log(
            `[Substack] Post scheduled for ${dayjs(schedule).format("MMM D, YYYY")}, at ${dayjs(schedule).format("h:mm A")}:`,
            `https://substack.com/@quotesdose/note/c-${note.id}`
        )
    } catch (error) {
        console.error("[Substack] Failed to create post:", error)
        throw error
    }
})()
