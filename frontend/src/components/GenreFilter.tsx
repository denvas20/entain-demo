import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import styled from "styled-components";
import { useGetGenresQuery } from "../redux/services/genre";
import { useDispatch } from "react-redux";
import { addGenre, removeGenre } from "../redux/slices/searchSlice";

export default function GenreFilter() {
    const genreQuery = useGetGenresQuery(null);

    const dispatch = useDispatch();

    return (
        <StyledFormGroup>
            {genreQuery.data &&
                genreQuery.data.data.map((genre, key) => (
                    <FormControlLabel
                        key={key}
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    if (e.target.checked)
                                        dispatch(addGenre(genre.id));
                                    else dispatch(removeGenre(genre.id));
                                }}
                            />
                        }
                        label={genre.name}
                    />
                ))}
        </StyledFormGroup>
    );
}

const StyledFormGroup = styled(FormGroup)`
    margin-top: 1rem;
    min-width: 16rem;
`;
