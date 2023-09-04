import { Component } from '@angular/core';
import { ProjetDemenagement } from '../../shared/models/projet.model';
import { TypeLivraison } from '../../shared/models/typeLivraison.model';
import { ProjetDemenagementService } from '../../shared/services/projet-demenagement.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';

@Component({
  selector: 'app-list-projets',
  templateUrl: './list-projets.component.html',
  styleUrls: ['./list-projets.component.scss']
})
export class ListProjetsComponent {
  projets:any[] = [
   

   ];
   

    transporteurEmail:string = '';
  
   constructor(
              private projetDemenagementService:ProjetDemenagementService,
              private webSocketService:WebsocketService,
              private demandeDemenagementService:DemandeDemenagementService){
   }

   ngOnInit(){
   
    this.transporteurEmail = localStorage.getItem('emailTransporteur') || ''; // Assign an empty string if null

    const demandeSubscription = this.webSocketService.subscribe('/topic/change', () => {
     
      this.getDemandes();
      console.log(this.projets)
    });
    this.getDemandes();

   }
   onRowClicked(project:ProjetDemenagement){
      this.projetDemenagementService.setSelectedDemande(project);
      // this.router.navigate(['/dashbord', 'single']);
      
    }

    getDemandes(): void {
      this.demandeDemenagementService.getProjects(this.transporteurEmail).subscribe(projets => {
       
       this.projets = projets;
      //  console.log(this.projets)

      });
    }

}
