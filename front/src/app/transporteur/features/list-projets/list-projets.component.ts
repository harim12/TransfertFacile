import { Component } from '@angular/core';
import { ProjetDemenagement } from '../../shared/models/projet.model';
import { TypeLivraison } from '../../shared/models/typeLivraison.model';
import { ProjetDemenagementService } from '../../shared/services/projet-demenagement.service';

@Component({
  selector: 'app-list-projets',
  templateUrl: './list-projets.component.html',
  styleUrls: ['./list-projets.component.scss']
})
export class ListProjetsComponent {
  projets:ProjetDemenagement[] = [
    {demande:{horaire:"2023-06-11",depart:"oujda hay andalous",arrivee:"saidiaa",typeLivraison:TypeLivraison.Maison},userDemanding:{name:'rim',phoneNumber:45}},
    {demande:{horaire:"2023-09-11",depart:"rabat",arrivee:"saidiaa",typeLivraison:TypeLivraison.Moto},userDemanding:{name:'chorouk',phoneNumber:45}},
    {demande:{horaire:"2023-05-11",depart:"sale",arrivee:"saidiaa",typeLivraison:TypeLivraison.Maison},userDemanding:{name:'rim',phoneNumber:45}},

   ];
  
   constructor(private projetDemenagementService:ProjetDemenagementService){
   }
   onRowClicked(project:ProjetDemenagement){
      this.projetDemenagementService.setSelectedDemande(project);
      // this.router.navigate(['/dashbord', 'single']);
      
    }
}
