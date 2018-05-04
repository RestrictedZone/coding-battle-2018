
function print(text) {
  process.stdout.write("" + text)
}

const ACTION_UP = 0
const ACTION_RIGHT = 1
const ACTION_DOWN = 2
const ACTION_LEFT = 3

const argv = process.argv.slice(2).map(i => parseInt(i))

// map 정보 만들기
const mapWidth = argv[0]
const mapHeight = argv[1]
const tiles = argv.slice(2, mapWidth * mapHeight + 2)

const playerArgs = argv.slice(mapWidth * mapHeight + 2)
const me = {
  x: playerArgs[1],
  y: playerArgs[2],
}
const players = []
for (let i = 1; i < playerArgs[0]; i++) {
  players.push({
    x: playerArgs[i * 2 + 1],
    y: playerArgs[i * 2 + 2],
  })
}

// 코딩 시작하기

print(ACTION_DOWN)
