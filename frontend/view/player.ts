
import * as _ from "lodash"
import * as pixi from "pixi.js"
import * as entity from "../entity"
import * as constants from "../constants"

const TILE_WIDTH = constants.resource.TILE_WIDTH
const TILE_HEIGHT = constants.resource.TILE_HEIGHT

const images = [
  "/static/images/cars/car_black_small_1.png",
  "/static/images/cars/car_blue_small_1.png",
  "/static/images/cars/car_green_small_1.png",
  "/static/images/cars/car_red_small_1.png",
  "/static/images/cars/car_yellow_small_1.png",

  "/static/images/cars/car_black_small_2.png",
  "/static/images/cars/car_blue_small_2.png",
  "/static/images/cars/car_green_small_2.png",
  "/static/images/cars/car_red_small_2.png",
  "/static/images/cars/car_yellow_small_2.png",

  "/static/images/cars/car_black_small_3.png",
  "/static/images/cars/car_blue_small_3.png",
  "/static/images/cars/car_green_small_3.png",
  "/static/images/cars/car_red_small_3.png",
  "/static/images/cars/car_yellow_small_3.png",

  "/static/images/cars/car_black_small_4.png",
  "/static/images/cars/car_blue_small_4.png",
  "/static/images/cars/car_green_small_4.png",
  "/static/images/cars/car_red_small_4.png",
  "/static/images/cars/car_yellow_small_4.png",

  "/static/images/cars/car_black_small_5.png",
  "/static/images/cars/car_blue_small_5.png",
  "/static/images/cars/car_green_small_5.png",
  "/static/images/cars/car_red_small_5.png",
  "/static/images/cars/car_yellow_small_5.png",
]

let playerUniqIndex = 0

export class Player extends pixi.Sprite {
  constructor(public player: entity.Player) {
    super(pixi.Texture.fromImage(images[playerUniqIndex]))
    playerUniqIndex = (playerUniqIndex + 1) % images.length
    this.pivot.set(20, 35)

    this.player.point = new Proxy(this.player.point, {
      set: (target, property, value) => {
        (target as any)[property] = value
        this.render()
        return true
      },
    })
    this.render()
  }

  public render(): void {
    this.x = (this.player.point.x + .5) * TILE_WIDTH
    this.y = (this.player.point.y + .5) * TILE_HEIGHT
    this.rotation = Math.PI * this.player.point.d / 2
  }
}
