import quotes from "./quotes.mjs"

function quote() {
    const random = Math.floor(Math.random() * quotes.length)

    return quotes[random]
}

export default quote()
