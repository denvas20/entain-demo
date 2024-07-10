import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./redux/services/movie";
import { searchSlice } from "./redux/slices/searchSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
