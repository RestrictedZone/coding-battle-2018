
import * as entity from "../entity"
import * as _ from "lodash"

export class Round {

  constructor(protected map: entity.Map, protected players: entity.Player[]) {
  }

  public async play(): Promise<entity.Player> {
    const turnedPlayers = _.shuffle(this.players.slice())

    for (const turnedPlayer of turnedPlayers) {

      await new Promise(resolve => setTimeout(resolve, 1000)) // delay

      turnedPlayer.move(await turnedPlayer.strategy(this.map, this.players), this.map, this.players)

      if (this.map.isEndPoint(turnedPlayer.point.x, turnedPlayer.point.y)) {
        console.log(`게임 끝! ${turnedPlayer.name} 승리!!`)
        return turnedPlayer
      }
    }

    return await this.play()
  }
}
