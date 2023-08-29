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

  // addDemande(demandeEntity: any): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('demenagementEntity', JSON.stringify(demandeEntity));
  //   return this.http.post<any>(`${this.baseUrl}/demande/add`, demandeEntity);
  // }

  addDemande(demenagementEntity: any, imageFile: File,imageSecondFile:File,imageThirdFile:File) {
    const formData = new FormData();
    formData.append('testeEntity', JSON.stringify(demenagementEntity));
    formData.append('image1', imageFile);
    formData.append('image2',imageSecondFile);
    formData.append('image3',imageThirdFile);
    console.log("this is the form data from the backend",formData.get("testeEntity"))
    return this.http.post<any>(`${this.baseUrl}/demande/addTeste`, formData);
  }

  
  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demande/get`);
  }

  getDemandeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/demande/get/${id}`);
  }

  notifyNewDemand(demande: any) {
    this.demandesSubject.next([...this.demandesSubject.getValue(), demande]);
  }
  getPriceSuggestionsByDemandeId(demandeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/price-suggestion/get/${demandeId}`);
  }
}
