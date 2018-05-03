
import {Direction} from "./direction"
import {PointAndDirection} from "./point-and-direction"
import * as api from "../api"

function isStartPoint(tile: number): boolean {
  return ((tile >> 8) & 3) === 1 // tslint:disable-line no-bitwise
}

function isEndPoint(tile: number): boolean {
  return ((tile >> 8) & 3) === 2 // tslint:disable-line no-bitwise
}

function getDirection(tile: number): Direction {
  return (tile >> 10) & 3 // tslint:disable-line no-bitwise
}

export class Map {

  public static createFromApiRawData(map: api.MapRawData): Map {
    return new Map(map.width, map.height, map.tiles, map.sprites)
  }

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly tiles: number[],
    public readonly sprites: number[]) {
  }

  public getStartPoints(): PointAndDirection[] {
    const points: PointAndDirection[] = []

    this.tiles.forEach((trigger, index) => {
      if (isStartPoint(trigger)) {
        const x = index % this.width
        const y = index / this.width | 0 // tslint:disable-line no-bitwise
        const d = getDirection(trigger)

        points.push(new PointAndDirection(x, y, d))
      }
    })
    return points
  }

  public isMovablePoint(x: number, y: number): boolean {
    const tile = this.tiles[(y * this.width) + x]
    return x < this.width
      && y < this.height
      && tile !== undefined
      && (tile & 255) > 0 // tslint:disable-line no-bitwise
  }

  public isEndPoint(x: number, y: number): boolean {
    const tile = this.tiles[(y * this.width) + x]
    return x < this.width
      && y < this.height
      && tile !== undefined
      && isEndPoint(tile)
  }
}
