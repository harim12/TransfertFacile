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
   console.log("clicked")
  }

 scrollToSingleComponent() {
    this.singleElementRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  getDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/demande/get`);
  }
}
