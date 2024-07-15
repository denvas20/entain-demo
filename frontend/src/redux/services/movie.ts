import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../../types/movie";
import QueryString from "qs";

const DEFAULT_PAGE_SIZE = 25;

interface MovieQuery {
    page: number;
    search: string;
    genres: Array<number>;
}

interface ListResult<T = unknown> {
    data: Array<T>;
    count: number;
}

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3100/movies" }),
    endpoints: (builder) => ({
        getMovies: builder.query<ListResult<Movie>, MovieQuery>({
            query: ({ search, page, genres }) => {
                const query = {
                    offset: (page - 1) * DEFAULT_PAGE_SIZE,
                    limit: DEFAULT_PAGE_SIZE,
                    search,
                    genres
                };
                return `?${QueryString.stringify(query)}`;
            }
        })
    })
});

export const { useGetMoviesQuery } = movieApi;
