import { Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { parse } from "wellknown";

export type Chunk = {
    minBound: {x: number, y: number, z: number}
    maxBound: {x: number, y: number, z: number}
}

@Injectable()
class AppService {
    private readonly client = new MongoClient(process.env.MONGO_CONNECTION_STRING as string, { useUnifiedTopology: true })

    async retrieve(chunk: Chunk) {
        if (!this.client.isConnected()) {
            await this.client.connect()
        }

        const geoJson = parse(`POLYGON((
            ${chunk.minBound.x} ${chunk.minBound.y},
            ${chunk.maxBound.x} ${chunk.minBound.y},
            ${chunk.maxBound.x} ${chunk.maxBound.y},
            ${chunk.minBound.x} ${chunk.maxBound.y},
            ${chunk.minBound.x} ${chunk.minBound.y}
            ))`)

        return this.client.db('world').collection('hexes').find({     
                position: {       
                    $geoWithin: {          
                        $geometry: geoJson     
                    }
                },
                "position.coordinates.2": {
                    $gte: chunk.minBound.z,
                    $lte: chunk.maxBound.z
                }
            }, {
                projection: {
                    _id: 0
                }
            }
        ).map(hex => ({
            position: {
                x: hex.position.coordinates[0],
                y: hex.position.coordinates[1],
                z: hex.position.coordinates[2]
            }
        })).toArray()
    }
}


export default AppService