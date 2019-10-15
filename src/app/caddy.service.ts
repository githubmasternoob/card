import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  host = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  removeCarte(id): Observable<any> {
    console.log('id dans service : ' + id);
    return this.http.delete<any>(this.host + '/cart_items/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted cart id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  addProduct(carteData): Observable<any> {
    console.log(carteData);
    return this.http.post<any>(this.host + '/cart_items', JSON.stringify(carteData), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  addCommande(commandeData): Observable<any> {
    // console.log('commandeData: ' + commandeData);
    return this.http.post<any>(this.host + '/commandes', JSON.stringify(commandeData), httpOptions).pipe(
      tap((product) => console.log(`added commande w/ id`)),
      catchError(this.handleError<any>('test'))
    );
  }

  getCaddy(): Observable<any> {
    const ide = +localStorage.getItem('userId');
    return this.http.get(this.host + '/me/' + ide, httpOptions).pipe(catchError(this.handleError<any>('Caddy')));
    // return this.http.get(this.host + '/cart_items', httpOptions).pipe(catchError(this.handleError<any>('Caddy')));
  }

  addDetailCarte(detailCarte): Observable<any> {
    return this.http.post<any>(this.host + '/carte_details', JSON.stringify(detailCarte), httpOptions).pipe(
      tap((product) => console.log(`added ligne detail w/ id`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  addLigneCommande(ligne): Observable<any> {
    // console.log('caddy total dans service: ' + caddy['hydra:totalItems']);
    // caddy['hydra:member'][i].carte.id
    return this.http.post<any>(this.host + '/order_items', JSON.stringify(ligne), httpOptions).pipe(
      tap((product) => console.log(`added ligne commande w/ id`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  getUserMail(): Observable<any> {
    const ide = +localStorage.getItem('userId');
    return this.http.get(this.host + '/user/' + ide, httpOptions).pipe(catchError(this.handleError<any>('Caddy')));
    // return this.http.get(this.host + '/cart_items', httpOptions).pipe(catchError(this.handleError<any>('Caddy')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
