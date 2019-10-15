import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  host = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) {
  }

  login(email: string, pass: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers: httpHeaders
    };
    const myobj = {
      username: email,
      password: pass
    };
    const myObjStr = JSON.stringify(myobj);
    console.log(JSON.parse(myObjStr));

    return this.httpClient.post<{ token: string }>('http://localhost:8000/login_check', myObjStr, options).pipe(tap(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', email);
    }));
  }

  register(user: string, pass: string, mail: string) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = {
      headers: httpHeaders
    };
    // const myobj = {
    //   username: user,
    //   password: pass,
    //   email: mail
    // };
    // console.log(myobj);
    // const formdata = new FormData();
    // formdata.append('username', 'dsqdsqdsqdsqdqs');
    // formdata.append('password', 'pass');
    // formdata.append('email', 'mail@hotmail.fr');
    // const myObjStr = JSON.stringify(myobj);
    // console.log(JSON.parse(myObjStr));
    // console.log(formdata);
    const body = new URLSearchParams();
    body.set('username', user);
    body.set('password', pass);
    body.set('email', mail);

    return this.httpClient.post('http://localhost:8000/register', body.toString(), options).pipe(tap(res => {
      console.log(res);
    }));
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // console.log(token);
    if (token == null) {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getRole() {
    console.log('get role function');
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    console.log('token decoded');
    console.log(tokenPayload.roles);
    // console.log(tokenPayload.roles);
    localStorage.setItem('role', tokenPayload.roles[0]);
    localStorage.setItem('userId', tokenPayload.userId);
    return localStorage.getItem('role');

  }

  CreateShoppingCart(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    };
    console.log(data);

    return this.httpClient.post<any>(this.host + '/shopping_carts', JSON.stringify(data), httpOptions).pipe(
      tap((product) => console.log(`added shoppingcart w/ id`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
