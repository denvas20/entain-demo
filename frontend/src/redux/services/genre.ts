import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Genre } from "../../types/movie";

interface ListResult<T = unknown> {
    data: Array<T>;
    count: number;
}

export const genreApi = createApi({
    reducerPath: "genreApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}/genres` }),
    endpoints: (builder) => ({
        getGenres: builder.query<ListResult<Genre>, null>({
            query: () => ""
        })
    })
});

export const { useGetGenresQuery } = genreApi;
