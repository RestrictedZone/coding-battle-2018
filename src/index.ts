
import * as executor from "./executor"
import * as types from "./types"
import * as pref from "preference"

(async () => {
  const executors: types.Executor[] = [
    new executor.NodeExecutor("langs/nodejs"),
    new executor.GoExecutor("langs/go"),
    new executor.KotlinExecutor("langs/kotlin"),
    new executor.PythonExecutor("langs/python"),
  ]

  await Promise.all(executors.map(ex => ex.build()))

  console.log("build complete!")

  const outputs = await Promise.all(executors.map(ex => ex.execute([1, 2, 3])))

  console.log(outputs)

  console.log("process complete!")
})()
