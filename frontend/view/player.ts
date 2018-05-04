
import * as _ from "lodash"
import * as pixi from "pixi.js"
import * as entity from "../entity"
import * as constants from "../constants"
import * as assets from "../loaders/assets"
import * as tween from "@tweenjs/tween.js"

const TILE_WIDTH = constants.resource.TILE_WIDTH
const TILE_HEIGHT = constants.resource.TILE_HEIGHT

let playerUniqIndex = 0

export class Player extends pixi.Container {

  protected spriteCarImage: pixi.Sprite

  protected textNameLabel: pixi.Text

  constructor(public player: entity.Player) {
    super()

    const spriteCarImage = new pixi.Sprite(pixi.Texture.fromImage(assets.cars[playerUniqIndex]))
    spriteCarImage.pivot.set(20, 35)
    spriteCarImage.x = TILE_WIDTH / 2
    spriteCarImage.y = TILE_HEIGHT / 2
    this.addChild(spriteCarImage)
    this.spriteCarImage = spriteCarImage

    playerUniqIndex = (playerUniqIndex + 1) % assets.cars.length

    const textNameLabel = new pixi.Text(player.name, {
      fill: "#ffffff",
      fontSize: "30px",
      fontFamily: "Montserrat",
      wordWrap : true,
      wordWrapWidth : 700,
    })
    textNameLabel.x = TILE_WIDTH / 2
    textNameLabel.y = TILE_HEIGHT / 2 - 50
    textNameLabel.anchor.set(0.5)
    this.addChild(textNameLabel)
    this.textNameLabel = textNameLabel

    this.player.point = new Proxy(this.player.point, {
      set: (target, property, value) => {
        (target as any)[property] = value
        this.render()
        return true
      },
    })
    this.x = this.player.point.x * TILE_WIDTH
    this.y = this.player.point.y * TILE_HEIGHT
    this.spriteCarImage.rotation = Math.PI * this.player.point.d / 2
}

  public render(): void {
    const curr = {x: this.x, y: this.y, rotation: this.spriteCarImage.rotation}
    new tween.Tween(curr)
      .to({
        x: this.player.point.x * TILE_WIDTH,
        y: this.player.point.y * TILE_HEIGHT,
        rotation: Math.PI * this.player.point.d / 2,
      }, 100)
      .easing(tween.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.x = curr.x
        this.y = curr.y
        this.spriteCarImage.rotation = curr.rotation
      })
      .start()
  }
}
