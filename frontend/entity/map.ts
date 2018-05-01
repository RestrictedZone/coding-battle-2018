
import {Direction} from "./direction"
import {PointAndDirection} from "./point-and-direction"
import * as api from "../api"

function isStartPoint(tile: number): boolean {
  return ((tile >> 8) & 1) === 1 // tslint:disable-line no-bitwise
}

function isEndPoint(tile: number): boolean {
  return ((tile >> 9) & 1) === 1 // tslint:disable-line no-bitwise
}

function getDirection(tile: number): Direction {
  return (tile >> 10) & 3 // tslint:disable-line no-bitwise
}

/*
t_tiles 4byte(=16bit)
4bit null
2bit 00 위방향 01 오른쪽 10 아래 11 왼쪽
2bit 01 시작점, 10 종료
8bit tiles info

# start parseInt("100100000001", 2) // 아래를 보는 시작점

typedef unsigned int t_tile
struct map {
  int width = MAP_WIDTH
  int height = MAP_HEIGHT
  t_tile[MAP_HEIGHT][MAP_WIDTH] tiles
}
*/
export class Map {

  public static createFromApiRawData(map: api.MapRawData): Map {
    return new Map(map.width, map.height, map.tiles)
  }

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly tiles: number[]) {
  }

  public getStartPoints(): PointAndDirection[] {
    const points: PointAndDirection[] = []

    this.tiles.forEach((tile, index) => {
      if (isStartPoint(tile)) {
        const x = index % this.width
        const y = index / this.width | 0 // tslint:disable-line no-bitwise
        const d = getDirection(tile)

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
