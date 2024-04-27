import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { LoginService } from "./services/auth/login.service";

@Injectable()
export class AuthGuard {
  constructor(private _loginService: LoginService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._loginService.loggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          this._router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
