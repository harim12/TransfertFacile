import { Component } from '@angular/core';
import { ProjetDemenagement } from '../../shared/models/projet.model';
import { ProjetDemenagementService } from '../../shared/services/projet-demenagement.service';

@Component({
  selector: 'app-projet-transfert',
  templateUrl: './projet-transfert.component.html',
  styleUrls: ['./projet-transfert.component.scss']
})
export class ProjetTransfertComponent {
  selectedProjet:ProjetDemenagement | undefined ;
  constructor(private projetDemenagementService:ProjetDemenagementService){}


  ngOnInit() {
    // Subscribe to the selectedDemande changes
    this.projetDemenagementService.selectedProjet$.subscribe((demande) => {
      this.selectedProjet = demande;
    });
  
  }


}
