import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  host = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  login(data) {
    this.http.post(this.host + '/login', data);
  }
}
