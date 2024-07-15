import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "../../entities/movie.entity";
import { ILike, Repository } from "typeorm";
import { CreateMovieDto, MovieQueryDto } from "./movie.dto";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>
    ) {}

    async getAll(query: MovieQueryDto) {
        const skip = query.offset || 0;
        const take = query.limit || 25;

        const title = ILike(`%${query.search}%`);

        const [data, count] = await this.movieRepository.findAndCount({
            skip,
            take,
            where: { title },
            order: { id: "asc" }
        });
        return { data, count };
    }
}
