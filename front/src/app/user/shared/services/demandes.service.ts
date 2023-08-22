import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  private baseUrl = 'http://localhost:8081'; // Update with your backend API base URL

  private demandesSubject = new BehaviorSubject<any[]>([]);
  public demandes$: Observable<any[]> = this.demandesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getHello(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/demande/`);
  }

  addDemande(demandeEntity: any): Observable<any> {
    console.log("adding new demande")
    return this.http.post<any>(`${this.baseUrl}/demande/add`, demandeEntity);
  }

  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demande/get`);
  }

  notifyNewDemand(demande: any) {
    this.demandesSubject.next([...this.demandesSubject.getValue(), demande]);
  }
}
