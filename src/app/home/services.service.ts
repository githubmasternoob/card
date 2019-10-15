import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  host = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  fetchCategories() {
    return this.http.get(this.host + '/categories');
  }

  fetchCards() {
    return this.http.get(this.host + '/cartes');
  }
}
