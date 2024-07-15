import { Controller, Get } from "@nestjs/common";
import { GenreService } from "./genre.service";

@Controller("genres")
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Get()
    async getMany() {
        const { data, count } = await this.genreService.getAll();
        return { data, count };
    }
}
