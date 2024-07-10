import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./redux/services/movie";
import { testSlice } from "./redux/slices/testSlice";

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
