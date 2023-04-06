import { Injectable } from '@angular/core';

type AuthToken = string | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): AuthToken {
    return sessionStorage.getItem('token');
  }

  set token(token: AuthToken) {
    if (token === null) {
      sessionStorage.removeItem('token');
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  logOut() {
    this.token = null;
  }
}
