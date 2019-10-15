import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
export class CartesService {
  public host = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  getResource(url) {
    return this.http.get(this.host + '/api' + url);
  }

  getCarteid(id): Observable<any> {
    return this.http.get(this.host + '/api/cartes/' + id, httpOptions);
  }

  sendmail(info): Observable<object> {
    console.log(info);
    const frmData = new FormData();
    frmData.append('mail', info.mail);
    frmData.append('name', info.name);
    frmData.append('fileName', info.fileName);
    frmData.append('message', info.message + info.description + info.price +
      '$' + 'Réferrence carte: 4768 , /n Cette carte est valide seulement dans le boutique : fff');
    console.log(frmData);
    console.log(info.fileName);
    return this.http.post(this.host + '/test/mail', frmData);
  }

  addCard(card): Observable<any> {
    return this.http.post(this.host + '/api/cartes', card);
  }
}
