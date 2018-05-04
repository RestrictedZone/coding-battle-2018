
import axios from "axios"
import {PointAndDirection} from "./point-and-direction"
import {Map} from "./map"
import * as api from "../api"

export class Player {

  public static createFromData(player: api.PlayerRawData, point: PointAndDirection): Player {
    return new Player(player.name, point)
  }

  constructor(
    public name: string,
    public point: PointAndDirection) {
  }

  public async strategy(map: Map, others: Player[]): Promise<number> {
    let params = [
      map.width,
      map.height,
    ]
    params = params.concat(map.tiles)
    params.push(others.length + 1)
    params.push(this.point.x)
    params.push(this.point.y)
    others.forEach((other) => {
      params.push(other.point.x)
      params.push(other.point.y)
    })
    const action = await axios.post(`/api/players/${this.name}/action?arguments=${params.join(",")}`)
    return action.data.player.response
  }
}
