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


  ngOnInit() {
    // Subscribe to the selectedDemande changes
    this.demandeDemenagementService.selectedDemande$.subscribe((demande) => {
      this.selectedDemande = demande;
      
    });
  
  }

  // scrollToSingleComponent() {
  //   if (this.singleComponent && this.singleComponent.nativeElement) {
  //     console.log("rah dkhl fwst SCROLLTOSINGLECOMPOENT++++++>")
  //     this.singleComponent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }

  // onRowClicked(demande: DemandeDemenagement) {
  //   this.demandeDemenagementService.setSelectedDemande(demande);
  //   if (demande) {
  //     console.log(demande)
  //     console.log("hbt=========>",this.singleComponent)
  //     // Set the selectedDemande to show the app-single-demande component
  //     this.selectedDemande = demande;

  //     // Scroll to the app-single-demande component when selectedDemande is updated
  //     this.scrollToSingleComponent();
  //   }
  //   }
}
