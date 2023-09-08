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


}
