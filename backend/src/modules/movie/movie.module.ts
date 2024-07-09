import { Module } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
import { Movie } from "../../entities/device.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    controllers: [MovieController],
    providers: [MovieService]
})
export class MovieModule {}
