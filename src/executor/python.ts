
import {execute as _execute} from "../util/process"
import * as types from "../types"

export class PythonExecutor implements types.Executor {

  constructor(private target: string) {}

  public async build(): Promise<void> {
    // nothing
  }

  public async execute(args: any[] = []): Promise<string> {
    return await _execute(`python main.py ${args.join(" ")}`, this.target)
  }
}
