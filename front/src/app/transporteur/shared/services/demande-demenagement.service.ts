import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeDemenagementService {

  private selectedDemandeSource = new BehaviorSubject<any>(null);
  selectedDemande$ = this.selectedDemandeSource.asObservable();
  private singleElementRef: ElementRef | undefined;
  private baseUrl = 'http://localhost:8081'; // Update with your backend API base URL

  
  constructor(private http: HttpClient) { }

  setSelectedDemande(demande: any) {
    this.selectedDemandeSource.next(demande);
  }

 scrollToSingleComponent() {
    this.singleElementRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demande/get`);
  }
  getDemandeById(id:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/demande/get/${id}`);
  }
  getProjects(email:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/project/get/${email}`)
  }

  getTransporteurInfo(email:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transporteur/get/${email}/info`);
  }
  addPriceSuggestion(priceSuggestionObject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/price-suggestion/add`, priceSuggestionObject);
  }
}
