import java.util.*

/**
 * 513을 찾아가야함
 * 0은 못감, 1은 감
 */
class Player(val x: Int, val y: Int) {
}

class Pathfinder(val args: List<Int>) {

    val ACTION_UP = 0
    val ACTION_RIGHT = 1
    val ACTION_DOWN = 2
    val ACTION_LEFT = 3

    val MAX_PATH = 100
    lateinit var me: Player
    lateinit var players: List<Player>

    lateinit var originTiles: MutableList<Int>
    val binaryTiles = mutableListOf<MutableList<Int>>()

    var mapWidth: Int = 0
    var mapHeight: Int = 0
    fun execute() {
        mapWidth = args[0]
        mapHeight = args[1]

        originTiles = args.slice(2..mapWidth * mapHeight + 1).toMutableList()
        val playerArgs = args.slice(mapWidth * mapHeight + 2 until args.size)

        me = Player(playerArgs[1], playerArgs[2])
        players = (1 until playerArgs[0]).map { Player(playerArgs[it * 2 + 1], playerArgs[it * 2 + 2]) }


        for (i in 0 until mapHeight) {
            binaryTiles += mutableListOf<Int>()
        }
        for (i in 0 until mapHeight * mapWidth) {
            binaryTiles[i / mapHeight].add(originTiles[i])
        }

        // 코딩 시작하기
        val direction = getDirection()
        print(if (direction == -1) Random().nextInt(4) else direction)
    }

    fun getDirection(): Int {
        val pathCnt = mutableListOf<Int>()

        originTiles[me.y * mapWidth + me.x] = 0
        pathCnt += getMinValue(me.x, me.y - 1, originTiles.toMutableList())
        pathCnt += getMinValue(me.x + 1, me.y, originTiles.toMutableList())
        pathCnt += getMinValue(me.x, me.y + 1, originTiles.toMutableList())
        pathCnt += getMinValue(me.x - 1, me.y, originTiles.toMutableList())
        var direction: Int = -1
        var minValue = Int.MAX_VALUE
        for ((i, value) in pathCnt.withIndex()) {
            if (minValue > value) {
                direction = i
                minValue = value
            }
        }
        return direction
    }

    fun getMinValue(x: Int, y: Int, tiles: MutableList<Int>): Int {
        var cnt = Int.MAX_VALUE
        if (y < 0 || y > mapHeight - 1 ||
                x < 0 || x > mapWidth - 1 ||
                tiles[y * mapWidth + x] == 0) {
            return Int.MAX_VALUE
        }
        if (tiles[y * mapWidth + x] == 513) {
            return 0
        }
        val queue: Queue<Pair<Int, Pair<Int, Int>>> = LinkedList<Pair<Int, Pair<Int, Int>>>()
        queue.add(0 to (x to y))
        while (queue.size != 0) {
            val data = queue.poll()
            val _x = data.second.first
            val _y = data.second.second

            if (tiles[_y * mapWidth + _x] == 513) {
                cnt = data.first
                break
            }
            tiles[_y * mapWidth + _x] = 0
            if (_y > 0 && tiles[(_y - 1) * mapWidth + _x] != 0)
                queue.add(data.first + 1 to (_x to _y - 1))
            if (_x < mapWidth - 1 && tiles[_y * mapWidth + _x + 1] != 0)
                queue.add(data.first + 1 to (_x + 1 to _y))
            if ((_y < mapHeight - 1) && tiles[(_y + 1) * mapWidth + _x] != 0)
                queue.add(data.first + 1 to (_x to _y + 1))
            if (_x > 0 && tiles[(_y * mapWidth + _x - 1)] != 0)
                queue.add(data.first + 1 to (_x - 1 to _y))
        }

        return cnt
    }
}

fun main(args: Array<String>) {
    Pathfinder(args.map { it.toInt() }).execute()
}
