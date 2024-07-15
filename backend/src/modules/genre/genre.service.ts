import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "../../entities/genre.entity";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>
    ) {}

    async getAll() {
        const [data, count] = await this.genreRepository.findAndCount({
            order: { id: "asc" }
        });
        return { data, count };
    }
}
