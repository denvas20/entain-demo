import { IsInt, IsString } from "class-validator";
import { Genre } from "../../entities/genre.entity";

export interface GenresDto {
    genres: Array<Genre>;
}
