
import * as entity from "../entity"
import * as _ from "lodash"

export class Round {

  protected victoryPlayers: entity.Player[] = []

  constructor(protected map: entity.Map, protected players: entity.Player[]) {
  }

  public async play(): Promise<entity.Player[]> {
    const turnedPlayers = _.shuffle(this.players.slice())

    for (const turnedPlayer of turnedPlayers) {
      if (this.victoryPlayers.indexOf(turnedPlayer) > -1) {
        continue
      }
      await new Promise(resolve => setTimeout(resolve, 100)) // delay

      try {
        const direction = await turnedPlayer.strategy(this.map, this.players)
        turnedPlayer.move(direction, this.map, this.players, this.victoryPlayers)

        if (this.victoryPlayers.length === this.players.length) {
          return this.victoryPlayers
        }
      } catch (e) {
        console.warn(e)
      }
    }

    return await this.play()
  }
}
