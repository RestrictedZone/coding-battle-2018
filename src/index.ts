
import {NodeExecutor, GoExecutor} from "./executor"
import * as pref from "preference"

(async () => {
  const nodeExecutor = new NodeExecutor("langs/nodejs")
  const goExecutor = new GoExecutor("langs/go")

  await nodeExecutor.build()
  await goExecutor.build()

  console.log("build complete!")

  console.log("node!")
  console.log(await nodeExecutor.execute([1, 2, 3]))

  console.log("go!")
  console.log(await goExecutor.execute([1, 2, 3]))

  console.log("process complete!")
})()
