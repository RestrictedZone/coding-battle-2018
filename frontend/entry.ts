
require("@/assets/scss/entry.scss") // tslint:disable-line

import * as pixi from "pixi.js"
import * as entity from "./entity"
import * as api from "./api"
import * as view from "./view"
import * as _ from "lodash"

function defineGlobal(key: string, value: any): void {
  (window as any)[key] = value
}

function act(player: entity.Player): number {
  return _.random(0, 3)
}

(async () => {
  const app = new pixi.Application(window.innerWidth, window.innerHeight, {
    backgroundColor : 0x333333,
  })

  const $elem = document.getElementById("play")
  if ($elem) {
    $elem.appendChild(app.view)
  }

  const mapRawData: api.MapRawData = await api.getMap()
  const playerRawDatas: api.PlayerRawData[] = await api.getPlayers()

  const map = entity.Map.createFromApiRawData(mapRawData)
  const startPoints = map.getStartPoints()

  const players = playerRawDatas
    .slice(0, startPoints.length) // 플레이어가 start point 보다 많으면 자른다!
    .map<entity.Player>((player, index) => {
      const startPoint = startPoints[index]
      return entity.Player.createFromData(player, startPoint)
    })

  // 게임 진행하기
  async function startGame(): Promise<void> {
    //
  }
  startGame()


  // view에 바인딩하기!!
  const viewMap = new view.Map(map)
  players.forEach(player => {
    viewMap.addChild(new view.Player(player))
  })
  app.stage.addChild(viewMap)

  function onResize(): void {
    app.renderer.resize(window.innerWidth, window.innerHeight)
    const ratio = Math.min(window.innerWidth / viewMap.originWidth, window.innerHeight / viewMap.originHeight)
    viewMap.position.set(window.innerWidth / 2, window.innerHeight / 2)
    viewMap.scale.set(ratio, ratio)
  }

  onResize()
  window.addEventListener("resize", onResize)

  defineGlobal("players", players) // for debugging :-)
})()
