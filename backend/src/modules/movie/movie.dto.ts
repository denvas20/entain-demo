import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class MovieQueryDto {
    @IsOptional()
    @IsInt()
    offset?: number;

    @IsOptional()
    @IsInt()
    limit?: number;

    @IsString()
    search!: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    genres?: Array<number>;
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
