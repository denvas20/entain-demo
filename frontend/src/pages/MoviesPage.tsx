import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetMoviesQuery } from "../redux/services/movie";
import styled from "styled-components";
import MovieTile from "../components/MovieTile";
import { Search } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    addGenre,
    decreasePage,
    increasePage,
    removeGenre,
    setSearch
} from "../redux/slices/searchSlice";
import { useGetGenresQuery } from "../redux/services/genre";

interface SearchForm {
    search: string;
}

export default function MoviesPage() {
    const search = useSelector((state: RootState) => state.search.search);
    const page = useSelector((state: RootState) => state.search.page);
    const genres = useSelector((state: RootState) => state.search.genres);
    const dispatch = useDispatch();

    const movieQuery = useGetMoviesQuery({ search, genres, page });
    const genreQuery = useGetGenresQuery(null);

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
                        >
                            <StyledFormGroup>
                                {genreQuery.data &&
                                    genreQuery.data.data.map((genre, key) => (
                                        <FormControlLabel
                                            key={key}
                                            control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        if (e.target.checked)
                                                            dispatch(
                                                                addGenre(
                                                                    genre.id
                                                                )
                                                            );
                                                        else
                                                            dispatch(
                                                                removeGenre(
                                                                    genre.id
                                                                )
                                                            );
                                                    }}
                                                />
                                            }
                                            label={genre.name}
                                        />
                                    ))}
                            </StyledFormGroup>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            {movieQuery.error && <div>Error</div>}
                            {movieQuery.isLoading && <div>Loading</div>}
                            {movieQuery.data && (
                                <>
                                    <div>
                                        <div>{`Results: ${movieQuery.data.count}`}</div>
                                        <div>
                                            <Button
                                                variant="text"
                                                onClick={() =>
                                                    dispatch(decreasePage())
                                                }
                                            >
                                                {"<"}
                                            </Button>
                                            <span>{page}</span>
                                            <Button
                                                variant="text"
                                                onClick={() =>
                                                    dispatch(increasePage())
                                                }
                                            >
                                                {">"}
                                            </Button>
                                        </div>
                                    </div>
                                    <MovieList>
                                        {movieQuery.data.data.map(
                                            (movie, key) => (
                                                <MovieTile
                                                    key={key}
                                                    movie={movie}
                                                />
                                            )
                                        )}
                                    </MovieList>
                                </>
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
    background: #ffffff;
    height: 4rem;
    box-sizing: border-box;
    padding: 0 1rem;
    position: sticky;
    top: 0px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    z-index: 10;
`;

const NavBar = styled.div`
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
    margin-bottom: 1rem;
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

const StyledFormGroup = styled(FormGroup)`
    margin-top: 1rem;
`;
