import { Component, Input, SimpleChanges } from '@angular/core';
import { ProjetDemenagement } from '../../shared/models/projet.model';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';

@Component({
  selector: 'app-single-projet',
  templateUrl: './single-projet.component.html',
  styleUrls: ['./single-projet.component.scss']
})
export class SingleProjetComponent {
  @Input() projet: any | undefined;
  demande!:any;
  constructor(private demandeDemenagementService:DemandeDemenagementService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projet'] && this.projet) {
      this.getDemande(this.projet.demandeId);
    }
  }
  
  getDemande(id:number): void {
    this.demandeDemenagementService.getDemandeById(id).subscribe(demande => {
     
     this.demande = demande;
     console.log(this.demande.specificDemande.type)

    });
  }

  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }

 

}
