import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/AuthData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.BASE_URL;
  private authUserSource = new ReplaySubject<AuthData>();
  authUser$ = this.authUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(loginCreds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/login`, loginCreds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  register(registerCreds: Partial<User>) {
    return this.http.post(`${this.BASE_URL}/account/register`, registerCreds).pipe(
      map((authData: AuthData) => {
        if(authData) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.setUser(authData);
        }
      })
    )
  }
  logout() {
    localStorage.removeItem('authData');
    this.authUserSource.next(null);
  }
  setUser(authData: AuthData) {
    this.authUserSource.next(authData);
  }
  
  refrestToken(authData: AuthData) {
    return this.http.post<AuthData>(`${this.BASE_URL}/account/refresh`, authData);
  }
  emitOldAuthData(authData: AuthData) {
    this.authUserSource.next(authData);
  }
}
