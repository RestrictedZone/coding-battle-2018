
require("dotenv").config() // tslint:disable-line

import * as chokidar from "chokidar"
import * as express from "express"
import * as path from "path"
import * as process from "process"
import * as types from "./types"
import * as executor from "./executor"
import * as controllers from "./controllers"
import pref from "preference"

let config: any = null
let players: types.PlayerExecutor[] = []

async function loadConfig(): Promise<void> {
  config = await pref.load("config")

  console.log("config loaded!")

  const afterExecutors: types.PlayerExecutor[] = (config.players.players as types.ConfigPlayer[]).map(player => {
    return {
      name: player.name,
      executor: new executor.Executor(path.resolve(process.cwd(), player.path)),
    }
  })
  try {
    await Promise.all(afterExecutors.map(afterExecutor => afterExecutor.executor.build()))
    players = afterExecutors
    console.log("build complete!")
  } catch (e) {
    console.log(e)
  }
}

chokidar.watch("config").on("change", async () => {
  console.log("change config, reload!")
  await loadConfig()
})

const main = async () => {
  await loadConfig()

  const app = express()
  const host = process.env.SERVER_HOST as string || "127.0.0.1"
  const port = parseInt(process.env.SERVER_PORT || "3000") // tslint:disable-line

  app.use("/static", express.static("public/static"))
  app.get("/", controllers.home)

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
      players: config.players.players.map((player: any) => {
        return {
          name: player.name,
        }
      }),
    })
  })
  app.post("/api/players/:id/action", async (req: express.Request, res: express.Response) => {
    const foundPlayer = players.find((player) => player.name === req.params.id)
    if (!foundPlayer) {
      res.status(404).send({
        success: false,
        message: "page not found",
      })
      return
    }
    const args = ((req.query.arguments || "") as string)
    try {
      const response = await foundPlayer.executor.execute(args.split(","))
      res.json({
        success: true,
        player: {
          id: req.params.id,
          response: parseInt(response.replace(/[^0-9]/g, ""), 10),
        },
      })
      return
    } catch (e) {
      res.json({
        success: false,
        error: e.message,
      })
    }
  })
  app.listen(port, host)
}
main()
