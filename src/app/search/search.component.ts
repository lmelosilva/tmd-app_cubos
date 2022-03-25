import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { GenreType, MovieId } from '../app.interface';
import { MovieService } from '../app.service';

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['../app.component.css']
})
export class SearchComponent {
    title = 'tmd-app';
    movie_details: MovieId | undefined
    movies: any = []
    genres: GenreType[] = []
    currentItemsToShow = []
    items = []
    constructor(private httpClient: HttpClient,
        private movieService: MovieService) {
    }
    ngOnInit() {
        this.movieService.getGenres().subscribe(data => {
            console.log(data)
            if (data.body) {
                this.genres = data.body?.genres
            }
        })
        // this.httpClient.get("assets/movies_test.json").subscribe(data =>{
        //   console.log(data);
        //   this.movies = data;
        // })
    }

    search(s: any) {
        console.log(s.target.value)
        this.movieService.getMoviesByName(s.target.value).subscribe(data => {
            console.log(data)
            this.movies = data.body?.results
            this.items = this.movies
        })

    }

    getGenreName(genre_id: number) {
        // console.log(this.genres.find(genre => genre.id == genre_id ? genre.name : ""))
        return this.genres.find(genre => genre.id == genre_id ? genre.name : "")?.name

    }

    getGenreNameDetails(genre_id: number) {
        // console.log(this.genres.find(genre => genre.id == genre_id ? genre.name : ""))
        return this.genres.find(genre => genre.id == genre_id ? genre.name : "")?.name

    }

    getMovieById(id: number) {
        this.movieService.getMovieById(id).subscribe(data => {
            console.log(data)
            if (data.body) {
                this.movie_details = data.body
                //this.movie_details.profit = this.movie_details.revenue - this.movie_details.budget
            }
            console.log(this.movie_details?.genres)
            // this.movies = data.body?.results
        })
    }
}