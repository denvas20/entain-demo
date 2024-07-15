import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmFactory } from "./factories/typeOrm.factory";
import { MovieModule } from "./modules/movie/movie.module";
import { GenreModule } from "./modules/genre/genre.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}.local`
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmFactory
        }),
        MovieModule,
        GenreModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
