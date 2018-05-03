
import * as numeral from "numeral"
import * as pixi from "pixi.js"
import * as assets from "./assets"

export function loadResources(app: pixi.Application, loader: pixi.loaders.Loader): Promise<void> {
  return new Promise(resolve => {
    const stage = new pixi.Container()
    const text = new PIXI.Text("0%", {
      fill: "#ffffff",
      fontSize: "48px",
      fontFamily: "Montserrat",
      wordWrap : true,
      wordWrapWidth : 700,
    })
    text.x = window.innerWidth / 2
    text.y = window.innerHeight / 2
    text.pivot.set(70, 24)
    stage.addChild(text)

    loader.add(assets.cars)
    loader.add(assets.tiles)

    loader.on("progress", (self, res) => {
      text.text = `${numeral(self.progress).format("0")}%`
    })
    loader.on("complete", (self, res) => {
      text.text = "100%"
      app.stage.removeChild(text)
      resolve()
    })
    loader.load()

    app.stage.addChild(text)
  })
}
