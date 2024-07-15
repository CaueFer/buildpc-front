import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url: string = 'http://localhost:3000/api/auth';

  private jwtToken!: string;
  private authenticationSub = new Subject<boolean>();
  private isAuthenticated = false;
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthentication() {
    return this.authenticationSub.asObservable();
  }

  getToken() {
    return this.jwtToken;
  }

  async loginUser(
    user: string,
    password: string,
    continueLogged: boolean
  ): Promise<any> {
    const userData: any = { userName: user, password: password };

    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(`${this.url}/login`, userData).subscribe({
        next: (data) => {
          if (data) {
            this.jwtToken = data.token;
            if (this.jwtToken) {
              this.authenticationSub.next(true);
              this.isAuthenticated = true;
              this.logoutTimer = setTimeout(() => {
                this.logout();
              }, data.expiresIn * 1000);

              const now = new Date();
              const expiresDate = new Date(
                now.getTime() + data.expiresIn * 1000
              );

              if (continueLogged) {
                this.addToLocalstorage(this.jwtToken, expiresDate);
              }
            }
            resolve(true);
          } else {
            reject(new Error('Conta não encontrada na resposta'));
          }
        },
        error: (err) => {
          console.error(err);
          let msg = '';
          if (err === 'Not Found') msg = 'Conta não cadastrada!';
          if (err === 'Not Acceptable') msg = 'Senha incorreta!';
          if (err === 'Internal Server Error')
            msg = 'Ocorreu um problema, tente novamente mais tarde.';
          if (err === 'Unknown Error')
            msg = 'Servidor em manutenção, tente novamente mais tarde.';

          msg = err.error.message;
          reject(msg);
        },
      });
    });
  }

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users');
  }

  logout() {
    this.jwtToken = '';
    this.authenticationSub.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.logoutTimer);

    this.router.navigate(['/login']);
  }

  addToLocalstorage(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
  }

  clearFromLocalstorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
    };
  }

  authFromLocalStorage() {
    const localStorageData = this.getLocalStorageData();

    if (localStorageData) {
      const now = new Date();
      const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

      if (expiresIn > 0) {
        this.jwtToken = localStorageData.token;
        this.isAuthenticated = true;
        this.authenticationSub.next(true);
        this.logoutTimer = setTimeout(() => {
          this.logout();
        }, expiresIn);
      }
    }
  }
}
