import { Controller, Get, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieQueryDto } from "./movie.dto";

@Controller("movies")
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    async getMany(@Query() query: MovieQueryDto) {
        const { data, count } = await this.movieService.getAll(query);
        return { data, count };
    }
}
