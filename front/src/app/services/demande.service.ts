import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private baseUrlDemandes = 'http://localhost:8080/demenagement-form';
  private baseUrlPriceSuggestion = 'http://localhost:8080/price-suggestion';

  constructor(private http: HttpClient) { }

  addDemande(demande: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlDemandes}/add`, demande);
  }

  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlDemandes}/get`);
  }
  addPriceSuggestion(demande: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlPriceSuggestion}/add`, demande);
  }

  getPriceSuggestion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlPriceSuggestion}/get`);
  }
}
