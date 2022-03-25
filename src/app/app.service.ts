import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Genres, MovieId } from './app.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  getMoviesByName(name: string): Observable<HttpResponse<ApiResponse>> {
    return this.http.get<ApiResponse>(`https://api.themoviedb.org/3/search/movie?api_key=e8856a5c87eebd48082482017a713c34&query=${name}&language=pt-BR`, {observe: 'response'})
  }

  getGenres(): Observable<HttpResponse<Genres>>{
    return this.http.get<Genres>('https://api.themoviedb.org/3/genre/movie/list?api_key=e8856a5c87eebd48082482017a713c34&language=pt-BR', {observe: 'response'})
  }

  getMovieById(id: number): Observable<HttpResponse<MovieId>>{
    return this.http.get<MovieId>(`https://api.themoviedb.org/3/movie/${id}?api_key=e8856a5c87eebd48082482017a713c34&language=pt`, {observe: 'response'})
  } 

}
