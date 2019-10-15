import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  host = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {
  }


  sendpdf(donne, fileName): Observable<object> {
    console.log(donne);
    console.log(fileName);
    const data = new FormData();
    data.append('data', donne);
    data.append('file', fileName);
    return this.httpClient.post(this.host + '/upload', data);
  }
}
