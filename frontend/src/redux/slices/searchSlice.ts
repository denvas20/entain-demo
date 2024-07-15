import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    search: string;
    page: number;
    genres: Array<number>;
}

const initialState: SearchState = { search: "", page: 1, genres: [] };

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        addGenre: (state, action: PayloadAction<number>) => {
            state.genres.push(action.payload);
        },
        removeGenre: (state, action: PayloadAction<number>) => {
            state.genres = state.genres.filter((id) => id !== action.payload);
        },
        increasePage: (state) => {
            state.page = state.page + 1;
        },
        decreasePage: (state) => {
            let newPage = state.page - 1;
            state.page = newPage < 1 ? 1 : newPage;
        }
    }
});

export const { setSearch, addGenre, removeGenre, increasePage, decreasePage } =
    searchSlice.actions;
