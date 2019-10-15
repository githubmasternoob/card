import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {


  host = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  getRecherche(dataForm) {
    return this.http.get(this.host + '/items/search/code/' + dataForm.code);
  }


  getDetailsCarte(url) {
    console.log('function  in service');
    url = '/detailitems/search/code/' + url;
    console.log(url);
    return this.http.get(this.host + url);
  }

  retirer(retire, res, id): Observable<any> {
    console.log('service!');
    const donne = {withdraw: 200, currentprice: 52, orderitem: '1'};
    donne.currentprice = res;
    donne.withdraw = retire;
    donne.orderitem = '/api/order_items/' + id;
    console.log(donne);
    console.log(JSON.stringify(donne));
    return this.http.post(this.host + '/carte_details', donne, httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
