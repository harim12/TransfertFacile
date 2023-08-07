import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeDemenagementService {

  private selectedDemandeSource = new BehaviorSubject<any>(null);
  selectedDemande$ = this.selectedDemandeSource.asObservable();
  private singleElementRef: ElementRef | undefined;


  setSelectedDemande(demande: any) {
    this.selectedDemandeSource.next(demande);
   console.log("clicked")
  }

 scrollToSingleComponent() {
  

    this.singleElementRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
}
}
