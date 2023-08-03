import { Component, ElementRef, ViewChild } from '@angular/core';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';
import { DemandeDemenagement } from '../../shared/models/demande.model';

@Component({
  selector: 'app-demande-transfert',
  templateUrl: './demande-transfert.component.html',
  styleUrls: ['./demande-transfert.component.scss']
})
export class DemandeTransfertComponent {
  selectedDemande:DemandeDemenagement | undefined ;
  constructor(private demandeDemenagementService:DemandeDemenagementService){}
  @ViewChild('singleComponent') singleComponent: ElementRef | undefined;


 ngOnInit() {
  // Subscribe to the selectedDemande changes
  this.demandeDemenagementService.selectedDemande$.subscribe((demande) => {
    if (demande) {
      // Set the selectedDemande to show the app-single-demande component
      this.selectedDemande = demande;

      // Scroll to the app-single-demande component
      if (this.singleComponent && this.singleComponent.nativeElement) {
        this.singleComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log( this.singleComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })        )
      }
    }
  });
}
}
