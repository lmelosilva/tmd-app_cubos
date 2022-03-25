import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MovieService } from './app.service';
import { GenreType, MovieId, Movies } from './app.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  length = 100;
  pageSize = 5;
  pageEvent: PageEvent | undefined;
  movies_filtered: any = []

  title = 'tmd-app';
  movie_details: MovieId | undefined
  movies: Movies[] = []
  genres: GenreType[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    private httpClient: HttpClient,
    private movieService: MovieService,
    private titleService: Title) { 
      this.titleService.setTitle("TMBD App")
    }
  ngOnInit() {
    this.movieService.getGenres().subscribe(data => {
      console.log(data)
      if (data.body) {
        this.genres = data.body?.genres
      }
    })
  }

  search(s: any) {
    this.movieService.getMoviesByName(s.target.value).subscribe(data => {
      if (data.body){
        this.movies = data.body.results
        var inital_page: PageEvent = {
        pageIndex: 0,
        previousPageIndex: 0,
        pageSize: 5,
        length: this.movies.length
      }
      this.length = this.movies.length
      this.filter_movies(inital_page)
      }
    })
    this.movie_details = undefined
  }

  getGenreName(genre_id: number) {
    return this.genres.find(genre => genre.id == genre_id ? genre.name : "")?.name
  }

  getGenreNameDetails(genre_id: number) {
    return this.genres.find(genre => genre.id == genre_id ? genre.name : "")?.name
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe(data => {
      if (data.body) {
        this.movie_details = data.body
        var profit = parseFloat(this.movie_details.revenue) - parseFloat(this.movie_details.budget)
        this.movie_details.profit = profit.toString()
        this.movie_details.budget = this.movie_details.budget
        var runtime = parseFloat(this.movie_details.runtime)
        var hours = runtime / 60
        var rhours = Math.floor(hours)
        var minutes = (hours - rhours) * 60
        var rminutes = Math.round(minutes)
        this.movie_details.runtime = rhours.toString() + "h" + rminutes.toString() + "m"

      }
      if (this.movie_details?.status == 'Released') {
        this.movie_details.status = 'Lançado'
      }
      if (this.movie_details?.original_language == 'en') {
        this.movie_details.original_language = 'Inglês'
      } else if (this.movie_details?.original_language == 'es') {
        this.movie_details.original_language = 'Espanhol'
      } else if (this.movie_details?.original_language == 'pt') {
        this.movie_details.original_language = 'Português'
      } else if (this.movie_details?.original_language == 'es') {
        this.movie_details.original_language = 'Espanhol'
      } else if (this.movie_details?.original_language == 'de') {
        this.movie_details.original_language = 'Alemão'
      } else if (this.movie_details?.original_language == 'it') {
        this.movie_details.original_language = 'Italiano'
      } else if (this.movie_details?.original_language == 'fr') {
        this.movie_details.original_language = 'Francês'
      } else if (this.movie_details?.original_language == 'ru') {
        this.movie_details.original_language = 'Russo'
      } 
    })
  }

  filter_movies(event: PageEvent) {
    this.movies_filtered = []
    var page = event.pageIndex + 1
    var start = page == 1 ? 0 : (page * event.pageSize) - event.pageSize;
    this.movies_filtered = this.movies.slice(start,(page * event.pageSize))
  }

}
