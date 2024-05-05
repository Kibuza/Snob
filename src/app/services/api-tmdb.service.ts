import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APITMDBService {
  bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzRmYmJiNjE4ZjgxZTk0MDYyZjVmZjg4MzY3ZjM3YSIsInN1YiI6IjY1YjZiMWRiNWUxNGU1MDE0N2FjZDRmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P6bfQbsAie5ZrnPucIKZeyk0bbSsxgxpAULNA5nkAxM';
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.bearerToken,
  });
  constructor(private http: HttpClient) {}

  getMovies(searchTerm : String): Observable<any> {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/search/movie?query=' + searchTerm +'&include_adult=false&language=es-ES&page=1',
      { headers: this.headers }
    );
  }

  getTrendingMovies():Observable<any> {
    return this.http.get<any>('https://api.themoviedb.org/3/trending/movie/day?language=es-ES', {headers: this.headers}
  )};

  getMovieById(searchTerm : String): Observable<any> {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/' + searchTerm +'?language=es-ES',
      { headers: this.headers }
    );
  }

   getUpcomingMovies():Observable<any> {
     return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming?language=es-ES', {headers: this.headers}
   )};

}
