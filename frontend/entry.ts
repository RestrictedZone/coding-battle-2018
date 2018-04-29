
require("@/assets/scss/entry.scss") // tslint:disable-line

import * as pixi from "pixi.js"

const app = new pixi.Application(window.innerWidth, window.innerHeight, {
  backgroundColor : 0x333333,
})

const $elem = document.getElementById("play")
if ($elem) {
  $elem.appendChild(app.view)
}

window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
})
