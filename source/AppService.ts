import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";

export type Coordinates = { x: number, y: number, z: number }

export type Chunk = {
    minBound: Coordinates
    maxBound: Coordinates
}

@Injectable()
class AppService {
    private readonly client = new MongoClient(process.env.MONGO_CONNECTION_STRING as string, { useUnifiedTopology: true })

    async retrieve(chunk: Chunk) {
        if (!this.client.isConnected()) {
            await this.client.connect()
        }

        return this.client.db('world').collection('hexes').find({     
                "position.coordinates.0": {
                    $gte: chunk.minBound.x,
                    $lte: chunk.maxBound.x
                },
                "position.coordinates.1": {
                    $gte: chunk.minBound.y,
                    $lte: chunk.maxBound.y
                },
                "position.coordinates.2": {
                    $gte: chunk.minBound.z,
                    $lte: chunk.maxBound.z
                }
            }
        ).map(hex => ({
            position: {
                x: hex.position.coordinates[0],
                y: hex.position.coordinates[1],
                z: hex.position.coordinates[2]
            },
            gameObjects: ['test']
        })).toArray()
    }
}


export default AppService