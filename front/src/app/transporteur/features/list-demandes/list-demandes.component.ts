import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DemandeDemenagement } from '../../shared/models/demande.model';
import { TypeLivraison } from '../../shared/models/typeLivraison.model';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';
import { Route, Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DemandesService } from 'src/app/user/shared/services/demandes.service';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.scss']
})
export class ListDemandesComponent {
   
   demandess:any[] = [];
   constructor(private demandeDemenagementService:DemandeDemenagementService,
              private router:Router,
              private demandeService:DemandesService,
              private webSocketService:WebsocketService){
   }

   ngOnInit(){
   
    

    const demandeSubscription = this.webSocketService.subscribe('/topic/add-demande', () => {
     
      this.getDemandes();
      console.log(this.demandess)
    });
    this.getDemandes();
    
   }
   
   onRowClicked(demande:DemandeDemenagement){

      this.demandeDemenagementService.setSelectedDemande(demande);
      
    }

    getDemandes(): void {
      this.demandeDemenagementService.getDemandes().subscribe(demandes => {
       
       this.demandess = demandes;

      });
    }

    


}
