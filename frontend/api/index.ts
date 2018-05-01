
import axios from "axios"

export interface MapRawData {
  width: number
  height: number
  tiles: number[]
}

export interface PlayerRawData {
  name: string
}

export async function getMap(): Promise<MapRawData> {
  const response = await axios.get("/api/map")
  if (response.data.success) {
    return response.data.map as MapRawData
  }
  throw new Error("api failure")
}

export async function getPlayers(): Promise<PlayerRawData[]> {
  const response = await axios.get("/api/players")
  if (response.data.success) {
    return response.data.players as PlayerRawData[]
  }
  throw new Error("api failure")
}
