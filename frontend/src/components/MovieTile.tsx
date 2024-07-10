import React from "react";
import { Movie } from "../types/movie";
import styled from "styled-components";

interface ComponentProps {
    movie: Movie;
}

export default function MovieTile({ movie }: ComponentProps) {
    return (
        <Wrapper>
            <IdDiv>{`Id: ${movie.id}`}</IdDiv>
            <TitleDiv>{movie.title}</TitleDiv>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-style: solid;
    border-width: 1px;
    border-radius: 1rem;
    padding: 1rem;
`;

const IdDiv = styled.div`
    font-size: 0.875rem;
    color: grey;
`;

const TitleDiv = styled.div`
    font-size: 1.25rem;
    font-weight: 600;
`;
