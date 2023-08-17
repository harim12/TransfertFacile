import { Component } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent {
  newDemandeName: string = '';
  newPriceSuggestion:string='';
  demandes: any[] = [];
  priceSuggestion: any[] = [];

  constructor(private demandeService: DemandeService,private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.loadDemandes();
    this.loadPriceSuggestion();
  
    const demandeSubscription = this.websocketService.subscribe('/topic/add-demande', () => {
      console.log('Received notification for new demande');
      this.loadDemandes();
    });
  
    // const priceSuggestionSubscription = this.websocketService.subscribe('/topic/add-price-suggestion', () => {
    //   this.loadPriceSuggestion();
    // });
  
   

  }

  onSubmit1(): void {
    if (this.newDemandeName.trim() === '') {
      return;
    }

    const newDemande = {
      type: this.newDemandeName
    };
   

    this.demandeService.addDemande(newDemande)
      .subscribe(response => {
        console.log('Added Demande:', response);
        // this.loadDemandes();
        this.newDemandeName = ''; // Clear the input
      });
  }


  onSubmit2(): void {
    if (this.newPriceSuggestion.trim() === '') {
      return;
    }

    const newPrice = {
      price:this.newPriceSuggestion
    }

    this.demandeService.addPriceSuggestion(newPrice)
      .subscribe(response => {
        console.log('Added price:', response);
        // this.loadDemandes();
        this.newPriceSuggestion = ''; // Clear the input
      });
  }

  private loadDemandes(): void {
    this.demandeService.getDemandes()
      .subscribe(demandes => {
        this.demandes = demandes;
      });
  }

  private loadPriceSuggestion(): void {
    this.demandeService.getPriceSuggestion()
      .subscribe(demandes => {
        this.priceSuggestion = demandes;
      });
  }
}
