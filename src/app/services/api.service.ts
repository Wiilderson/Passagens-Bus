import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../DTO/passagem.dto';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://127.0.0.1:8000/api/listar-cidades';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
