import { Controller, Get } from '@nestjs/common/decorators';

import AppService from "./AppService";


@Controller()
class AppController {
    private readonly service: AppService;

    constructor(service: AppService) {
        this.service = service;
    }

    @Get()
    index() {
        // @ts-ignore
        return this.service.retrieve(null, null);
    }
}


export default AppController
