import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetMoviesQuery } from "../redux/services/movie";
import styled from "styled-components";
import MovieTile from "../components/MovieTile";
import { Search } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { setSearch } from "../redux/slices/searchSlice";

interface SearchForm {
    search: string;
}

export default function MoviesPage() {
    const search = useSelector((state: RootState) => state.search.search);
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetMoviesQuery({ search });

    const { register, handleSubmit } = useForm<SearchForm>();
    const onSubmit: SubmitHandler<SearchForm> = ({ search }) =>
        dispatch(setSearch(search));

    return (
        <>
            <NavBarWrapper>
                <NavBar>
                    <div>Logo</div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            id="search"
                            label="Search"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" type="submit">
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...register("search")}
                        />
                    </Form>
                </NavBar>
            </NavBarWrapper>
            <SectionWrapper>
                <Section>
                    <Grid container spacing={4}>
                        <Grid
                            item
                            xs={0}
                            sm={4}
                            sx={{ display: { xs: "none", sm: "block" } }}
                        ></Grid>
                        <Grid item xs={12} sm={8}>
                            {error && <div>Error</div>}
                            {isLoading && <div>Loading</div>}
                            {data && (
                                <MovieList>
                                    {data.data.map((movie, key) => {
                                        return (
                                            <MovieTile
                                                key={key}
                                                movie={movie}
                                            />
                                        );
                                    })}
                                </MovieList>
                            )}
                        </Grid>
                    </Grid>
                </Section>
            </SectionWrapper>
        </>
    );
}

const NavBarWrapper = styled.nav`
    display: flex;
    justify-content: center;
    height: 4rem;
    box-sizing: border-box;
    padding: 0 1rem;
    position: sticky;
    top: 0px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
`;

const NavBar = styled.nav`
    width: 100%;
    max-width: 64rem;
    display: flex;
    align-items: center;
`;

const Form = styled.form`
    margin-left: 1rem;
    flex: 1 1 0%;
`;

const SectionWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding: 0 1rem;
`;

const Section = styled.section`
    width: 100%;
    max-width: 64rem;
`;

const MovieList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
