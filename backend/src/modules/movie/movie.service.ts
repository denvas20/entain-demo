import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "../../entities/movie.entity";
import { Repository } from "typeorm";
import { MovieQueryDto } from "./movie.dto";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>
    ) {}

    async getAll(query: MovieQueryDto) {
        const skip = query.offset || 0;
        const take = query.limit || 25;

        let sqlQuery = this.movieRepository
            .createQueryBuilder("movie")
            .leftJoinAndSelect("movie.genres", "genre")
            .where("movie.title LIKE :title", { title: `%${query.search}%` })
            .skip(skip)
            .take(take)
            .orderBy("movie.id", "ASC");

        if (query.genres)
            sqlQuery = sqlQuery.andWhere("genre.id IN(:...ids)", {
                ids: query.genres
            });

        const [data, count] = await sqlQuery.getManyAndCount();
        return { data, count };
    }
}
