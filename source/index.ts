import { NestFactory } from "@nestjs/core";

import { AppModule } from "./AppModule";

require('dotenv').config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(3000)
}

bootstrap()
    .catch(error => console.error(error))