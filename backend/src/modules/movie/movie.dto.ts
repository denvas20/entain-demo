import { IsInt, IsOptional, IsString } from "class-validator";

export class MovieQueryDto {
    @IsOptional()
    @IsInt()
    offset?: number;

    @IsOptional()
    @IsInt()
    limit?: number;

    @IsString()
    title!: string;
}
