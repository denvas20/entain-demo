import { IsInt, IsOptional, IsString } from "class-validator";

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
