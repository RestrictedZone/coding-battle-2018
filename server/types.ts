
export interface ConfigPlayer {
  name: string
  path: string
}

export interface Executor {
  build(): Promise<void>
  execute(args: any[]): Promise<string>
}

export interface PlayerExecutor {
  name: string
  executor: Executor
}
