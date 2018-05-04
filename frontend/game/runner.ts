
import * as pixi from "pixi.js"
import * as loaders from "../loaders"
import * as entity from "../entity"
import * as api from "../api"
import * as view from "../view"
import * as _ from "lodash"
import {Round} from "./round"

function defineGlobal(key: string, value: any): void {
  (window as any)[key] = value
}

export class Runner {

  protected onResize: (() => void) | undefined

  constructor(protected mapRawData: api.MapRawData, protected playerRawDatas: api.PlayerRawData[]) {
  }

  public async run(app: pixi.Application): Promise<void> {

    // generate models
    const map = entity.Map.createFromApiRawData(this.mapRawData)
    const startPoints = map.getStartPoints()
    const players = _.shuffle(this.playerRawDatas
      .slice(0, startPoints.length) // 플레이어가 start point 보다 많으면 자른다!
      .map<entity.Player>((player, index) => {
        const startPoint = startPoints[index]
        return entity.Player.createFromData(player, startPoint)
      }))

    // bind to views
    const viewMap = new view.Map(map)
    players.forEach(player => {
      viewMap.addChild(new view.Player(player))
    })
    app.stage.addChild(viewMap)

    if (this.onResize) {
      window.removeEventListener("resize", this.onResize)
      delete this.onResize
    }
    this.onResize = () => {
      const ratio = Math.min(window.innerWidth / viewMap.originWidth, window.innerHeight / viewMap.originHeight)
      viewMap.position.set(window.innerWidth / 2, window.innerHeight / 2)
      viewMap.scale.set(ratio, ratio)
    }
    this.onResize()

    window.addEventListener("resize", this.onResize)

    defineGlobal("players", players) // for debugging :-)

    const round = new Round(map, players)
    const victory = await round.play()
  }
}
