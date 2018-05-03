
require("@/assets/scss/entry.scss") // tslint:disable-line

import * as loaders from "./loaders"
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

  // loading
  const loader = new pixi.loaders.Loader()

  await loaders.loadResources(app, loader)

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
    const turnedPlayers = _.shuffle(players.slice())
    let victoryPlayer: entity.Player | undefined
    for (const turnedPlayer of turnedPlayers) {
      await new Promise(resolve => setTimeout(resolve, 300))
      let xToMove: number = turnedPlayer.point.x
      let yToMove: number = turnedPlayer.point.y
      let foundPlayer: entity.Player | undefined
      switch (act(turnedPlayer)) {
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
      if (!map.isMovablePoint(xToMove, yToMove)) {
        console.log("그러나 갈 수 있는 길이 없다.")
        continue
      }
      foundPlayer = players.find(player => {
        return player.point.x === xToMove
          && player.point.y === yToMove
      })
      if (foundPlayer) {
        console.log(`그러나 플레이어 ${foundPlayer.name}(이)가 막고 있어서 갈수 없다.`)
        continue
      }
      turnedPlayer.point.x = xToMove
      turnedPlayer.point.y = yToMove
      if (map.isEndPoint(xToMove, yToMove)) {
        victoryPlayer = turnedPlayer
        break
      }
    }
    if (victoryPlayer) {
      console.log(`게임 끝! ${victoryPlayer.name} 승리!!`)
    } else {
      setTimeout(startGame, 1200) // next turn!
    }
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
