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
    console.log(this.selectedDemande$)
  }

 scrollToSingleComponent() {
  // Set selectedDemande to show the app-single-demande component
  

  // Scroll to the app-single-demande component

    this.singleElementRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
}
}
