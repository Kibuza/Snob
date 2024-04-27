import { Injectable } from '@angular/core';
import { loginRequest } from '../../auth/login/loginRequest';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../auth/login/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  markAllAsTouched() {
    throw new Error('Method not implemented.');
  }

  private _registerUrl = "http://localhost:3000/api/register";
  constructor(private http:HttpClient) { }

  registerUser(user:any){
    return this.http.post<any>(this._registerUrl, user);
  }

}
