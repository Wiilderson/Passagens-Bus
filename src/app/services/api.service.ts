import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../DTO/passagem.dto';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/listar-cidades`);
  }

  searchTickets(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buscar-passagens`, requestBody);
  }

  searchSeats(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buscar-assentos`, requestBody);
  }
}
