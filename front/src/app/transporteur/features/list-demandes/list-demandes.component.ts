import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DemandeDemenagement } from '../../shared/models/demande.model';
import { TypeLivraison } from '../../shared/models/typeLivraison.model';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-demandes',
  templateUrl: './list-demandes.component.html',
  styleUrls: ['./list-demandes.component.scss']
})
export class ListDemandesComponent {
   demandes:DemandeDemenagement[] = [
    {horaire:"2023-06-11",depart:"oujda hay andalous",arrivee:"saidiaa",typeLivraison:TypeLivraison.Maison},
    {horaire:'2023-09-30',depart:"rabat kamra",arrivee:"casa aid diab",typeLivraison:TypeLivraison.Voiture},
    {horaire:'2023-06-22',depart:"sale jadida",arrivee:"rabat",typeLivraison:TypeLivraison.Moto},
    {horaire:'2023-08-10',depart:"oujda",arrivee:"saidiaa",typeLivraison:TypeLivraison.Voiture}
   ];
  
   constructor(private demandeDemenagementService:DemandeDemenagementService,private router:Router){
   }
   onRowClicked(demande:DemandeDemenagement){
      this.demandeDemenagementService.setSelectedDemande(demande);
      // this.router.navigate(['/dashbord', 'single']);
      
    }

}
