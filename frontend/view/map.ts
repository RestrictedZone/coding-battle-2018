

import * as pixi from "pixi.js"
import * as entity from "../entity"
import * as constants from "../constants"

const TILE_WIDTH = constants.resource.TILE_WIDTH
const TILE_HEIGHT = constants.resource.TILE_HEIGHT

const tGrass = pixi.Texture.fromImage("/static/images/grass/land_grass11.png")

const tRoadLR = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt01.png")
const tRoadTB = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt02.png")

const tRoadT = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt04.png")
const tRoadL = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt21.png")
const tRoadN = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt22.png")
const tRoadR = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt23.png")
const tRoadB = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt40.png")

const tRoadTL = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt06.png")
const tRoadTR = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt07.png")
const tRoadBL = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt24.png")
const tRoadBR = pixi.Texture.fromImage("/static/images/road_asphalt/road_asphalt25.png")

function createSprite(tex: pixi.Texture, x: number, y: number): pixi.Sprite {
  const sprite = new pixi.Sprite(tex)
  sprite.x = x * TILE_WIDTH
  sprite.y = y * TILE_HEIGHT
  return sprite
}

export class Map extends pixi.Container {
  constructor(public map: entity.Map) {
    super()
    this.render()
  }

  public render(): void {
    this.map.tiles.forEach((tile, index) => {
      const x = index % this.map.width
      const y = index / this.map.width | 0 // tslint:disable-line no-bitwise
      switch (tile & 255) { // tslint:disable-line no-bitwise
        case 2:
          this.addChild(createSprite(tGrass, x, y))
          break
        case 1:
          this.addChild(createSprite(tRoadN, x, y))
          break
      }
    })
    this.pivot.set(this.originWidth / 2, this.originHeight / 2)
  }

  get originWidth(): number {
    return this.map.width * TILE_WIDTH
  }

  get originHeight(): number {
    return this.map.height * TILE_HEIGHT
  }
}
