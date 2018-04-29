
import {execute as _execute} from "../util/process"
import * as types from "../types"

export class NodeExecutor implements types.Executor {

  constructor(private target: string) {}

  public async build(): Promise<void> {
    // empty
  }

  public async execute(args: any[] = []): Promise<string> {
    return _execute(`node main.js ${args.join(" ")}`, this.target)
  }
}
