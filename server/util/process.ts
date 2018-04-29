
import * as process from "child_process"

export async function execute(cmd: string, cwd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    process.exec(cmd, {
      cwd,
    }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}
