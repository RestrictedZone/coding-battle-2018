import sys
import random
from collections import deque

ACTION_UP = 0
ACTION_RIGHT = 1
ACTION_DOWN = 2
ACTION_LEFT = 3

ROOT = (None, None)

argv = list(map(int, sys.argv[1:]))

# map 정보 만들기
width = argv[0]
height = argv[1]
tiles = argv[2:width * height + 2]
player = argv[width * height + 2:]


# sys.stdout을 사용해야합니다.
def prt(value):
    sys.stdout.write(str(value))


def construct_path(state, meta):
    action = []
    idx = meta[state]
    while True:
        if idx == ROOT:
            break
        else:
            action.append(idx)
            idx = meta[idx]

    action.reverse()
    return action


def is_goal(state):
    return state in goal


def get_successors(m, state):
    r, c = state
    successors = []

    if c > 0:
        if m[r][c - 1] != 0:
            successors.append((r, c - 1))
    if c < width - 1:
        if m[r][c + 1] != 0:
            successors.append((r, c + 1))
    if r > 0:
        if m[r - 1][c] != 0:
            successors.append((r - 1, c))
    if r < height - 1:
        if m[r + 1][c] != 0:
            successors.append((r + 1, c))

    if len(successors) == 0:
        successors.append(random.choice([(r, c - 1), (r, c + 1), (r - 1, c), (r + 1, c)]))

    return successors


def bfs(m, pos):
    open_set = deque()
    closed_set = set()
    meta = dict()

    # init
    meta[pos] = ROOT
    open_set.append(pos)

    while len(open_set) > 0:
        sub_path = open_set.popleft()

        # find path!
        if is_goal(sub_path):
            return construct_path(sub_path, meta)

        for child in get_successors(m, sub_path):
            if child in closed_set:
                continue

            if child not in open_set:
                meta[child] = sub_path
                open_set.append(child)

        closed_set.add(sub_path)


# reshape
mat = list(map(list, zip(*[iter(tiles)] * width)))

me = {
    'x': player[1],
    'y': player[2],
}
r, c = me['y'], me['x']
players = []
for i in range(1, player[0]):
    _c = player[i * 2 + 1]
    _r = player[i * 2 + 2]

    players.append({
        'x': _c,
        'y': _r,
    })

    # other car to obstacle
    mat[_r][_c] = 0

# global goal index
goal = []
for _r in range(width):
    for _c in range(height):
        if mat[_r][_c] == 513:
            goal.append((_r, _c))

# draw map(debug)
# for x in mat:
#     print(x)

# 코딩 시작하기
path = bfs(mat, (r, c))
r_next, c_next = path[1]
if r < r_next: prt(ACTION_DOWN)
elif r > r_next: prt(ACTION_UP)
elif c < c_next: prt(ACTION_RIGHT)
elif c > c_next: prt(ACTION_LEFT)
