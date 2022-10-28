import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config({ path: "../../.env" })
dotenv.config()

const URI = process.env.URI
// console.log(URI)
const MODE = process.env.MODE
// console.log(MODE)

export {
    URI,
    MODE
}