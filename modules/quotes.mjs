import fs from "node:fs/promises"

import { existsSync } from "node:fs"

async function quotes() {
    const url = "https://quotesdose.pages.dev/api/quotes.json"
    const cache = {
        dir: "cache",
        filename: "quotes.json"
    }

    cache.path = `${cache.dir}/${cache.filename}`

    try {
        if (existsSync(cache.path)) {
            const all = JSON.parse(await fs.readFile(cache.path, "utf-8"))

            return all
        } else {
            const res = await fetch(url)
            const all = await res.json()

            await fs.mkdir(cache.dir, { recursive: true })
            await fs.writeFile(cache.path, JSON.stringify(all), "utf-8")

            return all
        }
    } catch (error) {
        console.error("Failed to load quotes:", error)
    }
}

export default await quotes()
