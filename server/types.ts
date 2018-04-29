
export interface Executor {
  build(): Promise<void>
  execute(args: any[]): Promise<string>
}
