import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./redux/services/movie";
import { searchSlice } from "./redux/slices/searchSlice";
import { genreApi } from "./redux/services/genre";

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            movieApi.middleware,
            genreApi.middleware
        ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
