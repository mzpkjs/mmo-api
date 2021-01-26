import { Injectable } from "@nestjs/common";


@Injectable()
class AppService {
    // @ts-ignore
    retrieve(radius: number, origin: { x: number, y: number }) {
        return [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
        ];
    }
}


export default AppService