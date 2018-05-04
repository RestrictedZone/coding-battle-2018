
import * as entity from "../entity"
import * as _ from "lodash"

export class Round {

  constructor(protected map: entity.Map, protected players: entity.Player[]) {
  }

  public async play(): Promise<entity.Player> {
    const turnedPlayers = _.shuffle(this.players.slice())

    for (const turnedPlayer of turnedPlayers) {

      await new Promise(resolve => setTimeout(resolve, 300)) // delay

      const others = this.players.filter(player => player.name !== turnedPlayer.name)
      let xToMove: number = turnedPlayer.point.x
      let yToMove: number = turnedPlayer.point.y
      let foundPlayer: entity.Player | undefined
      switch (await turnedPlayer.strategy(this.map, others)) {
        case 0:
          console.log(turnedPlayer.name, "은 위로 이동하기를 시전하였다.")
          xToMove = turnedPlayer.point.x
          yToMove = turnedPlayer.point.y - 1
          turnedPlayer.point.d = entity.Direction.Up
          break
        case 1:
          console.log(turnedPlayer.name, "은 오른쪽으로 이동하기를 시전하였다.")
          xToMove = turnedPlayer.point.x + 1
          yToMove = turnedPlayer.point.y
          turnedPlayer.point.d = entity.Direction.Right
          break
          case 2:
          console.log(turnedPlayer.name, "은 아래로 이동하기를 시전하였다.")
          xToMove = turnedPlayer.point.x
          yToMove = turnedPlayer.point.y + 1
          turnedPlayer.point.d = entity.Direction.Down
          break
        case 3:
          console.log(turnedPlayer.name, "은 왼쪽으로 이동하기를 시전하였다.")
          xToMove = turnedPlayer.point.x - 1
          yToMove = turnedPlayer.point.y
          turnedPlayer.point.d = entity.Direction.Left
          break
      }
      if (!this.map.isMovablePoint(xToMove, yToMove)) {
        console.log("그러나 갈 수 있는 길이 없다.")
        continue
      }
      foundPlayer = this.players.find(player => {
        return player.point.x === xToMove
          && player.point.y === yToMove
      })
      if (foundPlayer) {
        console.log(`그러나 플레이어 ${foundPlayer.name}(이)가 막고 있어서 갈수 없다.`)
        continue
      }
      turnedPlayer.point.x = xToMove
      turnedPlayer.point.y = yToMove
      if (this.map.isEndPoint(xToMove, yToMove)) {
        console.log(`게임 끝! ${turnedPlayer.name} 승리!!`)
        return turnedPlayer
      }
    }

    return await this.play()
  }
}
