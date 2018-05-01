
import {Point} from "./point"
import {Direction} from "./direction"

export class PointAndDirection extends Point {
  constructor(x: number, y: number, public d: Direction) {
    super(x, y)
  }
}
