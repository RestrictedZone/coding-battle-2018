
import * as express from "express"
import * as path from "path"

export const home = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(process.cwd(), "public/index.html"))
}
