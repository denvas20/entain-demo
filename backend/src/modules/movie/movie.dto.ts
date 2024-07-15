import { IsInt, IsOptional, IsString } from "class-validator";
import { Genre } from "../../entities/genre.entity";

export class MovieQueryDto {
    @IsOptional()
    @IsInt()
    offset?: number;

    @IsOptional()
    @IsInt()
    limit?: number;

    @IsString()
    search!: string;
}

export class CreateMovieDto {
    @IsInt()
    id!: number;

    @IsString()
    title!: string;
}

export interface DiscoveredMoviesDto {
    page: number;
    results: Array<{
        id: number;
        genre_ids: Array<number>;
        title: string;
    }>;
    total_pages: number;
    total_results: number;
}
