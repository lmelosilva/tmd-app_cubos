export interface ApiResponse {
    page: number;
    results: Movies[];
}

export interface Movies {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Genres {
    genres: GenreType[]
}

export interface GenreType {
    id: number;
    name: string;
}

export interface MovieId {
    overview: string;
    title: string;
    genres: GenreType[]
    status: string;
    vote_average: number;
    original_language: string;
    budget: string;
    runtime: string;
    revenue: string;
    video: boolean;
    poster_path: string;
    release_date: string;
    profit?: string;
}