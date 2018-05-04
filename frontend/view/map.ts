

import * as pixi from "pixi.js"
import * as entity from "../entity"
import * as constants from "../constants"

const TILE_WIDTH = constants.resource.TILE_WIDTH
const TILE_HEIGHT = constants.resource.TILE_HEIGHT

function createSprite(tex: pixi.Texture, x: number, y: number): pixi.Sprite {
  const sprite = new pixi.Sprite(tex)
  sprite.x = x * TILE_WIDTH
  sprite.y = y * TILE_HEIGHT
  return sprite
}

function createRectangle(color: number, x: number, y: number): pixi.Graphics {
  const padding = 10
  const rect = new pixi.Graphics()

  rect.beginFill(color, 0.35)
  rect.drawRect(
    x * TILE_WIDTH + padding,
    y * TILE_HEIGHT + padding,
    TILE_WIDTH - 2 * padding,
    TILE_HEIGHT - 2 * padding)
  rect.endFill()
  return rect
}

function createLine(x: number, y: number): pixi.Graphics {
  const rect = new pixi.Graphics()
  rect.lineStyle(4, 0xffffff, 0.1)
  rect.drawRect(
    x * TILE_WIDTH,
    y * TILE_HEIGHT,
    TILE_WIDTH,
    TILE_HEIGHT)
  return rect
}

export class Map extends pixi.Container {
  constructor(public map: entity.Map) {
    super()
    this.render()
  }

  public render(): void {
    this.map.sprites.forEach((sprite, index) => {
      const x = index % this.map.width
      const y = index / this.map.width | 0 // tslint:disable-line no-bitwise
      this.addChild(createSprite(pixi.Texture.fromImage(`/static/images/tiles/${sprite}.png`), x, y))
      this.addChild(createLine(x, y))
  })
    // 맵 디버깅용!!
    // this.map.tiles.forEach((tile, index) => {
    //   const x = index % this.map.width
    //   const y = index / this.map.width | 0 // tslint:disable-line no-bitwise
    //   if (tile > 0) {
    //     // this.addChild(createRectangle(0x0000FF, x, y))
    //   } else {
    //     this.addChild(createRectangle(0xFF0000, x, y))
    //   }
    // })
    this.pivot.set(this.originWidth / 2, this.originHeight / 2)
  }

  get originWidth(): number {
    return this.map.width * TILE_WIDTH
  }

  get originHeight(): number {
    return this.map.height * TILE_HEIGHT
  }
}
