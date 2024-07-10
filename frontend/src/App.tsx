import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MoviesPage from "./pages/MoviesPage";

export default function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <CssBaseline />
            <MoviesPage />
        </ThemeProvider>
    );
}
