import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Genre } from "../entities/genre.entity";
import { Movie } from "../entities/movie.entity";
import { ConfigService } from "@nestjs/config";
import { Config } from "../app.types";

export function typeOrmFactory(
    configService: ConfigService<Config>
): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
        type: "postgres",
        host: configService.get<string>("DATABASE_HOST") || "",
        port: configService.get<number>("DATABASE_PORT") || 5432,
        username: configService.get<string>("DATABASE_USER") || "",
        password: configService.get<string>("DATABASE_PASSWORD") || "",
        database: configService.get<string>("DATABASE_NAME") || "",
        entities: [Genre, Movie],
        synchronize: configService.get<boolean>("DATABASE_SYNCRONIZE") || false
    };
}
