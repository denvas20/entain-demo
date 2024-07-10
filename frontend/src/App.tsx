import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useGetMoviesQuery } from "./redux/services/movie";

export default function App() {
    const count = useSelector((state: RootState) => state.test.value);
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetMoviesQuery({ search: "" });

    return (
        <div>
            {error && <div>Error</div>}
            {isLoading && <div>Loading</div>}
            {data && (
                <div>
                    {data.data.map((movie, key) => {
                        return (
                            <div key={key}>{`${movie.id} ${movie.title}`}</div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
