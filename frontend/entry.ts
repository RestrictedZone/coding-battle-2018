
require("@/assets/scss/entry.scss") // tslint:disable-line

import * as loaders from "./loaders"
import * as pixi from "pixi.js"
import * as api from "./api"
import * as game from "./game"
import axios from "axios"

(async () => {
  const app = new pixi.Application(window.innerWidth, window.innerHeight, {
    backgroundColor : 0x333333,
  })

  const $elem = document.getElementById("play")
  if ($elem) {
    $elem.appendChild(app.view)
  }
  function onResize(): void {
    app.renderer.resize(window.innerWidth, window.innerHeight)
  }
  onResize()
  window.addEventListener("resize", onResize)


  // loading
  const loader = new pixi.loaders.Loader()

  await loaders.loadResources(app, loader)

  const mapRawData: api.MapRawData = await api.getMap()
  const playerRawDatas: api.PlayerRawData[] = await api.getPlayers()

  const runner = new game.Runner(mapRawData, playerRawDatas)
  runner.run(app)
})()
