
import * as executor from "../server/executor"
import * as types from "../server/types"
import * as pref from "preference"

(async () => {
  const executors: types.Executor[] = [
    new executor.Executor("langs/nodejs"),
    new executor.Executor("langs/go"),
    new executor.Executor("langs/kotlin"),
    new executor.Executor("langs/python"),
  ]

  await Promise.all(executors.map(ex => ex.build()))

  console.log("build complete!")

  const outputs = await Promise.all(executors.map(ex => ex.execute([1, 2, 3])))

  console.log(outputs)

  console.log("process complete!")
})()
