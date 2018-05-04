
import sys
from functools import reduce

ACTION_UP = 0
ACTION_RIGHT = 1
ACTION_DOWN = 2
ACTION_LEFT = 3

# sys.stdout을 사용해야합니다.
def prt(value):
  sys.stdout.write(str(value))

argv = list(map(int, sys.argv[1:]))

# map 정보 만들기
mapWidth = argv[0]
mapHeight = argv[1]
tiles = argv[2:mapWidth * mapHeight + 2]

playerArgs = argv[mapWidth * mapHeight + 2:]
me = {
  'x': playerArgs[1],
  'y': playerArgs[2],
}
players = []
for i in range(1, playerArgs[0]):
  players.append({
    'x': playerArgs[i * 2 + 1],
    'y': playerArgs[i * 2 + 2],
  })

# 코딩 시작하기

prt(ACTION_DOWN)
