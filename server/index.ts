
require("dotenv").config() // tslint:disable-line

import * as chokidar from "chokidar"
import * as express from "express"
import * as  path from "path"
import * as process from "process"
import pref from "preference"

let config = pref.loadSync("config")

const watcher = chokidar.watch("config")
watcher.on("change", async () => {
  console.log("change config, reload!")
  config = await pref.load("config")
})

const app = express()
const host = process.env.SERVER_HOST as string || "127.0.0.1"
const port = parseInt(process.env.SERVER_PORT || "3000") // tslint:disable-line

app.use("/static", express.static("public/static"))
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(process.cwd(), "public/index.html"))
})

// api :-)
app.get("/api/map", (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    map: config.map[config.map.default],
  })
})
app.get("/api/players", (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    players: Object.keys(config.players),
  })
})
app.post("/api/players/:id/action", (req: express.Request, res: express.Response) => {
  const player = config.players[req.params.id]
  if (!player) {
    res.status(404).send({
      success: false,
      message: "page not found",
    })
    return
  }
  res.json({
    success: true,
    player: {
      id: req.params.id,
    },
  })
})

app.listen(port, host)
