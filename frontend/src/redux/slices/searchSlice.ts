import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    search: string;
}

const initialState: SearchState = { search: "" };

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

export const { setSearch } = searchSlice.actions;
