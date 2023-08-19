import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { SelectedOptionService } from '../../shared/services/selected-option.service';
import { ColisObjetEmballeDemenagementComponent } from '../colis-objet-emballe-demenagement/colis-objet-emballe-demenagement.component';
import { DemandesService } from '../../shared/services/demandes.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-demenagement-form-second',
  templateUrl: './demenagement-form-second.component.html',
  styleUrls: ['./demenagement-form-second.component.scss']
})
export class DemenagementFormSecondComponent {

  addedNewOne:boolean = false;
  demandes:any[] = [];
  specialInformation: string = ''; // Variable to store the entered special information

  @ViewChild('colisContainer', { read: ViewContainerRef }) colisContainer!: ViewContainerRef;

  constructor(public selectedOptionService:SelectedOptionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private demandeService:DemandesService,
              private webSocketService:WebsocketService,
              ) {}


  ngOnInit(){
    const demandeSubscription = this.webSocketService.subscribe('/topic/add-demande', () => {
     
      this.getDemandes();
    });
    this.getDemandes();
  }

  createChildComponent() {
    const childComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ColisObjetEmballeDemenagementComponent);
    const childComponentRef = this.colisContainer.createComponent(childComponentFactory);
    this.addedNewOne = true
    // Vous pouvez interagir avec la nouvelle instance du composant fils ici si nécessaire
  }

  addDemande(): void {
    const demandeEntity: any = {
      // Create a DemandeEntity object with necessary properties
      // You might need to populate these properties based on your use case

      demandeName: this.specialInformation,
    };

    this.demandeService.addDemande(demandeEntity).subscribe(response => {
      console.log(response); // Display the response from the backend
      this.demandeService.notifyNewDemand(response); // Notify other components
    });
    
  }

  

  getDemandes(): void {
    this.demandeService.getDemandes().subscribe(demandes => {
      this.demandes = demandes; // Display the array of demandes from the backend
    });
  }
}
