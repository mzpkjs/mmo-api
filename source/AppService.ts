import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";

export type Coordinates = { x: number, y: number, z: number }

export type Chunk = {
    minBound: Coordinates
    maxBound: Coordinates
}

export type Hex = {
    position: {
        x: number,
        y: number,
        z: number
    }
}

@Injectable()
class AppService {
    private readonly client = new MongoClient(process.env.MONGO_CONNECTION_STRING as string, { useUnifiedTopology: true })

    async retrieve(chunk: Chunk) {
        if (!this.client.isConnected()) {
            await this.client.connect()
        }

        return this.client
        .db('world')
        .collection('hexes')
        .find({     
                "position.x": {
                    $gte: chunk.minBound.x,
                    $lte: chunk.maxBound.x
                },
                "position.y": {
                    $gte: chunk.minBound.y,
                    $lte: chunk.maxBound.y
                },
                "position.z": {
                    $gte: chunk.minBound.z,
                    $lte: chunk.maxBound.z
                }
            },
            {
                projection: {
                    "_id": 0,
                    "position": 1
                }
            }
        )
        .limit((chunk.maxBound.x - chunk.minBound.x + 1) * (chunk.maxBound.y - chunk.minBound.y + 1) * (chunk.maxBound.z - chunk.minBound.z + 1))
        .map((hex: Hex) => ({
            position: hex.position,
            gameObjects: hex.position.z < 0 ? ['water'] : ['land']
        }))
        .toArray()
    }
}


export default AppService