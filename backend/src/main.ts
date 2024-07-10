import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./app.types";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MovieService } from "./modules/movie/movie.service";

async function bootstrap() {
    const logger = new Logger(NestApplication.name);

    const app = await NestFactory.create(AppModule);

    app.enableCors();

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

    const movieService = app.get<MovieService>(MovieService);
    const { count } = await movieService.getAll({ search: "" });
    if (count === 0) {
        const movies = [
            { id: 1, title: "test1" },
            { id: 2, title: "test2" },
            { id: 3, title: "test3" },
            { id: 4, title: "test4" }
        ];
        movies.forEach((movie) => movieService.create(movie));
    }

    await app.listen(port);
    logger.log(`Service listening to port: ${port}`);
}
bootstrap();
