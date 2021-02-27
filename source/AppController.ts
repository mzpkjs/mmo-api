import { Body, Controller, Get,  Post } from '@nestjs/common/decorators';

import AppService, { Chunk } from "./AppService";

@Controller()
class AppController {
    private readonly service: AppService

    constructor(service: AppService) {
        this.service = service;
    }

    @Get()
    index() {
        return 'ok'
    }

    @Post()
    async loadChunk(@Body() chunk: Chunk) {
        console.log(chunk)
        const timestamp = Date.now()
        const result = await this.service.retrieve(chunk);
        console.log(Date.now() - timestamp)
        return result
    }
}


export default AppController
