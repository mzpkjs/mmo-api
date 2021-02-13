import { Body, Controller, Post } from '@nestjs/common/decorators';

import AppService, { Chunk } from "./AppService";

@Controller()
class AppController {
    private readonly service: AppService

    constructor(service: AppService) {
        this.service = service;
    }

    @Post()
    async loadChunk(@Body() chunk: Chunk) {
        console.log(chunk)
        return await this.service.retrieve(chunk)
    }
}


export default AppController
