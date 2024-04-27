import { Injectable } from '@angular/core';
import { loginRequest } from '../../auth/login/loginRequest';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from '../../auth/login/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginUrl = "http://localhost:3000/api/login";

  //Creamos dos behavioursubject para gestionar los datos del login:
  logeado  : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser : BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:"ejemplo@void.com", password:"naruto"});

  constructor(private http:HttpClient) { }

  loginUser(user : any){
   return  this.http.post<any>(this._loginUrl, user).pipe(
    tap( userData => {
      localStorage.setItem('token', userData.token);
      this.logeado.next(true);
    }),
    catchError(this.handleError)
  );
  }

  //Las credenciales son de tipo loginRequest y el observable que devuelve de tipo User
  login(credentials: loginRequest):Observable<User>{
    return this.http.get<any>('././assets/data.json').pipe(
      tap( userData => {
        this.currentUser.next(userData);
        this.logeado.next(true);
      }),
      catchError(this.handleError)
    );
  }

  //Gestionamos si hay un error
  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido un error' + error.error);
      
    }else{
      console.error('Backend devolvió el código ' + error.status, error.error);
    }
    return throwError(() => new Error('Algo falló, inténtalo de nuevo'));
  }

  //Comprueba si el token de sesión existe, es decir, si el user está logeado o no, devuelve true o false
  loggedIn(): Observable<boolean> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return of(true);
      }
    }
    return this.logeado.asObservable();
  }

  //Getters de los behaviourSubject
  get userData():Observable<User>{
    return this.currentUser.asObservable();
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
