
import axios from "axios"
import {PointAndDirection} from "./point-and-direction"
import {Map} from "./map"
import {Direction} from "./direction"
import * as api from "../api"
import * as _ from "lodash"

function findPlayers(others: Player[], x: number, y: number): Player | undefined {
  return others.find(other => {
    return other.point.x === x && other.point.y === y
  })
}

export class Player {

  public static createFromData(player: api.PlayerRawData, point: PointAndDirection): Player {
    return new Player(player.name, point)
  }

  constructor(
    public name: string,
    public point: PointAndDirection) {
  }

  public async strategy(map: Map, players: Player[]): Promise<number> {
    // return _.random(0, 3)
    const others = players.filter(player => player.name !== this.name)
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

  public move(direction: number, map: Map, players: Player[], pushed: boolean = false): boolean {
    const others = players.filter(player => player.name !== this.name)
    let xToMove = this.point.x
    let yToMove = this.point.y
    const action = pushed ? "밀리기를 당했다!!" : "이동하기를 시전하였다."
    switch (direction) {
      case 0:
        console.log(`${this.name}은(는) 위로 ${action}`)
        xToMove = this.point.x
        yToMove = this.point.y - 1
        if (!pushed) {
          this.point.d = Direction.Up
        }
        break
      case 1:
        console.log(`${this.name}은(는) 오른쪽으로 ${action}`)
        xToMove = this.point.x + 1
        yToMove = this.point.y
        if (!pushed) {
          this.point.d = Direction.Right
        }
        break
      case 2:
        console.log(`${this.name}은(는) 아래로 ${action}`)
        xToMove = this.point.x
        yToMove = this.point.y + 1
        if (!pushed) {
          this.point.d = Direction.Down
        }
        break
      case 3:
        console.log(`${this.name}은(는) 왼쪽으로 ${action}`)
        xToMove = this.point.x - 1
        yToMove = this.point.y
        if (!pushed) {
          this.point.d = Direction.Left
        }
        break
    }
    if (!map.isMovablePoint(xToMove, yToMove)) {
      if (pushed) {
        console.log("그러나 더이상 밀릴 수 없다....")
      } else {
        console.log("그러나 갈 수 있는 길이 없다.")
      }
      return false
    }
    const foundPlayer = findPlayers(others, xToMove, yToMove)
    if (foundPlayer) {
      if (!foundPlayer.move(direction, map, players, true)) {
        return false
      }
    }
    this.point.x = xToMove
    this.point.y = yToMove
    return true
  }
}
