
import * as executor from "./executor"
import * as pref from "preference"

(async () => {
  const nodeExecutor = new executor.NodeExecutor("langs/nodejs")
  const goExecutor = new executor.GoExecutor("langs/go")
  const kotExecutor = new executor.KotlinExecutor("langs/kotlin")

  await nodeExecutor.build()
  await goExecutor.build()
  await kotExecutor.build()

  console.log("build complete!")

  console.log("node!")
  console.log(await nodeExecutor.execute([1, 2, 3]))

  console.log("go!")
  console.log(await goExecutor.execute([1, 2, 3]))

  console.log("kotlin!")
  console.log(await kotExecutor.execute([1, 2, 3]))

  console.log("process complete!")
})()
