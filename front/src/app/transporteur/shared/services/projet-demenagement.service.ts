import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetDemenagementService {

  private selectedProjetSource = new BehaviorSubject<any>(null);
  selectedProjet$ = this.selectedProjetSource.asObservable();
  private singleElementRef: ElementRef | undefined;


  setSelectedDemande(projet: any) {
    this.selectedProjetSource.next(projet);
  }

}
