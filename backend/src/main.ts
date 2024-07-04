import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./app.types";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger(NestApplication.name);

    const configSrvice = app.get(ConfigService<Config>);
    const port = configSrvice.get<number>("port") || 3100;

    await app.listen(port);
    logger.log(`Service listening to port: ${port}`);
}
bootstrap();
