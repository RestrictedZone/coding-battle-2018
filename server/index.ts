
require("dotenv").config() // tslint:disable-line

import * as express from "express"
import * as  path from "path"
import * as process from "process"

const app = express()
const host = process.env.SERVER_HOST as string || "127.0.0.1"
const port = parseInt(process.env.SERVER_PORT || "3000") // tslint:disable-line

app.use("/static", express.static("public/static"))
app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(process.cwd(), "public/index.html"))
})

app.listen(port, host)
