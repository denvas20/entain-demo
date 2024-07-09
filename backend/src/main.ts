import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./app.types";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger(NestApplication.name);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle("Entain Demo API")
        .setDescription("")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, document);

    const configService = app.get(ConfigService<Config>);
    const port = configService.get<number>("PORT") || 3100;

    await app.listen(port);
    logger.log(`Service listening to port: ${port}`);
}
bootstrap();
