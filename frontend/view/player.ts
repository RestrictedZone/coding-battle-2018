
import * as _ from "lodash"
import * as pixi from "pixi.js"
import * as entity from "../entity"
import * as constants from "../constants"
import * as assets from "../loaders/assets"
import * as tween from "@tweenjs/tween.js"

const TILE_WIDTH = constants.resource.TILE_WIDTH
const TILE_HEIGHT = constants.resource.TILE_HEIGHT

let playerUniqIndex = 0

function animate(time: number): void {
  requestAnimationFrame(animate)
  tween.update(time)
}
requestAnimationFrame(animate)

export class Player extends pixi.Sprite {
  constructor(public player: entity.Player) {
    super(pixi.Texture.fromImage(assets.cars[playerUniqIndex]))
    playerUniqIndex = (playerUniqIndex + 1) % assets.cars.length
    this.pivot.set(20, 35)

    this.player.point = new Proxy(this.player.point, {
      set: (target, property, value) => {
        (target as any)[property] = value
        this.render()
        return true
      },
    })
    this.x = (this.player.point.x + .5) * TILE_WIDTH
    this.y = (this.player.point.y + .5) * TILE_HEIGHT
    this.rotation = Math.PI * this.player.point.d / 2
}

  public render(): void {
    const curr = {x: this.x, y: this.y, rotation: this.rotation}
    new tween.Tween(curr)
      .to({
        x: (this.player.point.x + .5) * TILE_WIDTH,
        y: (this.player.point.y + .5) * TILE_HEIGHT,
        rotation: Math.PI * this.player.point.d / 2,
      }, 100)
      .easing(tween.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.x = curr.x
        this.y = curr.y
        this.rotation = curr.rotation
      })
      .start()
  }
}
