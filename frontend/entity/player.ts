
import {PointAndDirection} from "./point-and-direction"
import * as api from "../api"

export class Player {

  public static createFromData(player: api.PlayerRawData, point: PointAndDirection): Player {
    return new Player(player.name, point)
  }

  constructor(
    public name: string,
    public point: PointAndDirection) {
  }
}
