
import {execute as _execute} from "./util/process"
import * as types from "./types"

export class Executor implements types.Executor {

  constructor(private target: string) {}

  public async build(): Promise<void> {
    await _execute(`make`, this.target)
  }

  public async execute(args: any[] = []): Promise<string> {
    return (await _execute(`./entry.sh ${args.join(" ")}`, this.target)).trim()
  }
}
