import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./app.types";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import axios from "axios";
import { DiscoveredMoviesDto } from "./modules/movie/movie.dto";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Genre } from "./entities/genre.entity";
import { GenresDto } from "./modules/genre/genre.dto";

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
    const port = parseInt(configService.get("PORT") || "") || 3100;
    const apiUrl = configService.get<string>("API_URL") || "";
    const apiKey = configService.get<string>("API_KEY") || "";
    const seed = configService.get("SEED") === "true";
    const genreRepository = app.get<Repository<Genre>>(
        getRepositoryToken(Genre)
    );
    const movieRepository = app.get<Repository<Movie>>(
        getRepositoryToken(Movie)
    );

    const query = new URLSearchParams();
    query.set("api_key", apiKey);

    if (seed) {
        try {
            const { data } = await axios.get<GenresDto>(
                `/genre/movie/list?${query}`,
                { baseURL: apiUrl }
            );
            const genres: Array<Genre> = [];
            data.genres.forEach((genre) =>
                genres.push(genreRepository.create(genre))
            );
            genreRepository.save(genres);
        } catch (error) {
            logger.error(`Error while seeding genres`);
        }

        let totalPages = 100;
        let page = 1;

        while (page <= totalPages) {
            logger.log(`Seeding Database. Page ${page} of ${totalPages}`);
            try {
                query.set("page", `${page}`);
                const { data } = await axios.get<DiscoveredMoviesDto>(
                    `/discover/movie?${query}`,
                    { baseURL: apiUrl }
                );
                const movies: Array<Movie> = [];
                data.results.forEach((movie) => {
                    const genres = movie.genre_ids.map((id) => ({ id }));
                    movies.push(movieRepository.create({ ...movie, genres }));
                });
                movieRepository.save(movies);
                page++;
            } catch (error) {
                logger.error(`Error while fetching movies`);
            }
        }
    }

    await app.listen(port);
    logger.log(`Service listening to port: ${port}`);
}
bootstrap();
