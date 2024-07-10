export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    genres: Array<Genre>;
}
