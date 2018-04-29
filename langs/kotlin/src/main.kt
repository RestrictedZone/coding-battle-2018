
fun main(args: Array<String>) {
    val argv = args.map { it.toInt() }
    print(argv.reduce { carry, arg -> carry + arg })
}
