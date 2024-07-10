import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../../types/movie";

interface MovieQuery {
    offset?: number;
    limit?: number;
    search: string;
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
            query: ({ offset, limit, search }) => {
                const query = new URLSearchParams();
                if (offset !== undefined) query.append("offset", `${offset}`);
                if (limit !== undefined) query.append("limit", `${limit}`);
                query.append("search", `${search}`);
                return `?${query}`;
            }
        })
    })
});

export const { useGetMoviesQuery } = movieApi;
