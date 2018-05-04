
class Player(val x: Int, val y: Int) {
}

class Pathfinder(val args: List<Int>) {

    val ACTION_UP = 0
    val ACTION_RIGHT = 1
    val ACTION_DOWN = 2
    val ACTION_LEFT = 3

    fun execute() {
        val mapWidth = args[0]
        val mapHeight = args[1]

        val tiles = args.slice(2..mapWidth *mapHeight + 1)
        val playerArgs = args.slice(mapWidth *mapHeight + 2..args.size - 1)

        val me = Player(playerArgs[1], playerArgs[2])
        var players: MutableList<Player> = mutableListOf<Player>()

        for (i in 1..playerArgs[0]-1) {
            players.add(Player(playerArgs[i * 2 + 1], playerArgs[i * 2 + 2]))
        }

        // 코딩 시작하기

        print(ACTION_DOWN)
    }
}

fun main(args: Array<String>) {
    Pathfinder(args.map { it.toInt() }).execute()
}
