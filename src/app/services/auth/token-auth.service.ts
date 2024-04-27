import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private _tokenSubject: BehaviorSubject<string | null>;
  private _userSubject: BehaviorSubject<any | null>;
  private apiUrl = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) {
    // Inicializa el BehaviorSubject con el valor inicial del token, que podría ser null
    this._tokenSubject = new BehaviorSubject<string | null>(null);
    this._userSubject = new BehaviorSubject<any | null>(null);
  }

  // Método para obtener el token como un Observable
  getToken(): Observable<string | null> {
    return this._tokenSubject.asObservable();
  }

  // Método para establecer el token y notificar a los observadores
  setToken(token: string) {
    this._tokenSubject.next(token);
    // Aquí podrías decodificar el token para obtener información adicional del usuario si está disponible
    // Por ejemplo, si el token es JWT, puedes extraer información del payload
  }
  getActualUser(): Observable<any> {

    if(!localStorage.getItem('token')){
      return this.http.get<any>(this.apiUrl).pipe(
        catchError(error => {
          return throwError(()=>'No hay token');
        })
      );
    }
    const token = localStorage.getItem('token');
    this.setToken(token!); // Establece el token
    return this.http.get<any>(this.apiUrl, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      tap(user => {
        this._userSubject.next(user);
      })
    );
  }

  getUserInfo(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  setUser(user: any | null) {
    this._userSubject.next(user);
  }

  getUser(): Observable<any | null> {
    return this._userSubject.asObservable();
  }
}
