
import * as pixi from "pixi.js"
import * as loaders from "../loaders"
import * as entity from "../entity"
import * as api from "../api"
import * as view from "../view"
import * as _ from "lodash"
import {Round} from "./round"
import * as tween from "@tweenjs/tween.js"

function animate(time: number): void {
  requestAnimationFrame(animate)
  tween.update(time)
}
requestAnimationFrame(animate)

function defineGlobal(key: string, value: any): void {
  (window as any)[key] = value
}

function createRankText(player: entity.Player, rank: number): pixi.Text {
  const text = new pixi.Text(`#${rank}. ${player.name}`, {
    fill: "#ffffff",
    fontSize: "40px",
    fontFamily: "Montserrat",
    wordWrap : true,
    wordWrapWidth : 800,
  })
  text.pivot.x = 100
  text.x = window.innerWidth / 2
  text.y = window.innerHeight / 5 + (rank * 50)
  return text
}

export class Runner {

  protected onResize: (() => void) | undefined

  constructor(protected mapRawData: api.MapRawData, protected playerRawDatas: api.PlayerRawData[]) {
  }

  public async run(app: pixi.Application): Promise<void> {

    // generate models
    const map = entity.Map.createFromApiRawData(this.mapRawData)
    const startPoints = map.getStartPoints()
    const players = _.shuffle(this.playerRawDatas)
      .slice(0, startPoints.length) // 플레이어가 start point 보다 많으면 자른다!
      .map<entity.Player>((player, index) => {
        const startPoint = startPoints[index]
        return entity.Player.createFromData(player, startPoint)
      })

    // bind to views
    const viewMap = new view.Map(map)
    players.forEach(player => {
      viewMap.addChild(new view.Player(player))
    })
    app.stage.addChild(viewMap)

    if (this.onResize) {
      window.removeEventListener("resize", this.onResize)
      delete this.onResize
    }
    this.onResize = () => {
      const ratio = Math.min(window.innerWidth / viewMap.originWidth, window.innerHeight / viewMap.originHeight)
      viewMap.position.set(window.innerWidth / 2, window.innerHeight / 2)
      viewMap.scale.set(ratio, ratio)
    }
    this.onResize()

    window.addEventListener("resize", this.onResize)

    defineGlobal("players", players) // for debugging :-)

    const textPath = new pixi.Text("Path", {
      fill: "#ffffff",
      fontSize: "120px",
      fontFamily: "Pacifico",
      stroke: "#444444",
      strokeThickness: 10,
      wordWrap : true,
      wordWrapWidth : 700,
    })
    const textFinder = new pixi.Text("Finder", {
      fill: "#ffffff",
      fontSize: "120px",
      fontFamily: "Pacifico",
      stroke: "#444444",
      strokeThickness: 10,
      wordWrap : true,
      wordWrapWidth : 700,
    })
    const textGo = new pixi.Text("Go!!", {
      fill: "#ffffff",
      fontSize: "120px",
      fontFamily: "Pacifico",
      wordWrap : true,
      wordWrapWidth : 800,
      padding: 20,
    })
    const textRetry = new pixi.Text("Retry..", {
      fill: "#ffffff",
      fontSize: "120px",
      fontFamily: "Pacifico",
      wordWrap : true,
      wordWrapWidth : 800,
      padding: 20,
    })
    textPath.anchor.set(0.5)
    textPath.position.set(window.innerWidth / 2 - 180, window.innerHeight / 3)
    textFinder.anchor.set(0.5)
    textFinder.position.set(window.innerWidth / 2 + 110, window.innerHeight / 3)
    textGo.anchor.set(0.5)
    textGo.position.set(window.innerWidth / 2, window.innerHeight * 2 / 3)
    textGo.buttonMode = true
    textGo.interactive = true

    textRetry.anchor.set(0.5)
    textRetry.position.set(window.innerWidth / 2, window.innerHeight * 2 / 3)
    textRetry.buttonMode = true
    textRetry.interactive = true

    app.stage.addChild(textPath)
    app.stage.addChild(textFinder)
    app.stage.addChild(textGo)

    textGo.on("pointerdown", async () => {
      app.stage.removeChild(textPath)
      app.stage.removeChild(textFinder)
      app.stage.removeChild(textGo)

      const victories = await new Round(map, players).play()

      victories.forEach((victory, index) => {
        const text = createRankText(victory, index + 1)
        text.alpha = (victories.length - index) / victories.length
        app.stage.addChild(text)
      })
      app.stage.addChild(textRetry)
    })
    textGo.on("pointerover", () => {
      const curr = {scale: textGo.scale.x}
      new tween.Tween(curr)
        .to({
          scale: 1.2,
        }, 100)
        .easing(tween.Easing.Quadratic.Out)
        .onUpdate(() => {
          textGo.scale.set(curr.scale, curr.scale)
        })
        .start()
    })
    textGo.on("pointerout", () => {
      const curr = {scale: textGo.scale.x}
      new tween.Tween(curr)
        .to({
          scale: 1,
        }, 100)
        .easing(tween.Easing.Quadratic.Out)
        .onUpdate(() => {
          textGo.scale.set(curr.scale, curr.scale)
        })
        .start()
    })

    textRetry.on("pointerdown", async () => {
      location.reload()
    })
    textRetry.on("pointerover", () => {
      const curr = {scale: textRetry.scale.x}
      new tween.Tween(curr)
        .to({
          scale: 1.2,
        }, 100)
        .easing(tween.Easing.Quadratic.Out)
        .onUpdate(() => {
          textRetry.scale.set(curr.scale, curr.scale)
        })
        .start()
    })
    textRetry.on("pointerout", () => {
      const curr = {scale: textRetry.scale.x}
      new tween.Tween(curr)
        .to({
          scale: 1,
        }, 100)
        .easing(tween.Easing.Quadratic.Out)
        .onUpdate(() => {
          textRetry.scale.set(curr.scale, curr.scale)
        })
        .start()
    })  }
}
