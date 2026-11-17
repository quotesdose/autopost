import quote from "./quote.mjs"

const content = {
    text: [
        `"${quote.text}"`,
        `— ${quote.author.name}`,
        "",
        ["#Quotes", ...quote.tags.map((tag) => `#${tag.name.replaceAll(" ", "")}`)].join(" ")
    ].join("\n"),
    image: new Object()
}

for (const [key, value] of Object.entries(quote.image)) {
    content.image[key] = {
        url: value.url,
        alt: `Minimal Quotes Dose quote image with the text "${quote.text}" and ${quote.author.name} attribution on a ${quote.color.hex} background.`,
        dimensions: (([w, h]) => ({ width: 1080, height: Math.round((1080 * h) / w) }))(
            value.ratio.split(":").map(Number)
        ),
        encoding: "image/png",
        buffer: Buffer.from(await (await fetch(value.url)).arrayBuffer())
    }
}

export default content
