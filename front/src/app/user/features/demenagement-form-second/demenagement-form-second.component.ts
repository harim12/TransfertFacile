import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { SelectedOptionService } from '../../shared/services/selected-option.service';
import { ColisObjetEmballeDemenagementComponent } from '../colis-objet-emballe-demenagement/colis-objet-emballe-demenagement.component';
import { DemandesService } from '../../shared/services/demandes.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemenagementRequestVoiture } from '../../shared/models/DemenagementRequestVoiture.model';
import { DemandeCommonProperties } from '../../shared/models/demandeCommonProperties.model';

@Component({
  selector: 'app-demenagement-form-second',
  templateUrl: './demenagement-form-second.component.html',
  styleUrls: ['./demenagement-form-second.component.scss']
})
export class DemenagementFormSecondComponent {

  addedNewOne:boolean = false;
  specialInformation: string = ''; // Variable to store the entered special information
  demandeEntityForm!: FormGroup;
  childData:any;
  initialForm :any;

  demenagementEntityCar!:DemenagementRequestVoiture;
  demenagementEntityMoto:any;

  @ViewChild('colisContainer', { read: ViewContainerRef }) colisContainer!: ViewContainerRef;

  constructor(public selectedOptionService:SelectedOptionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private demandeService:DemandesService,
              private webSocketService:WebsocketService,
              private formBuilder:FormBuilder
              ) {}


  ngOnInit(){

    this.initialForm = history.state.formData;
    console.log("form data==>",this.initialForm)

    this.demandeEntityForm = this.formBuilder.group({
      horaire: ['', Validators.required],
     
    });
  
   
  }

  handleSelectedOptions(selectedOptions: any) {
    this.childData = selectedOptions;
    console.log("this is child data",this.childData);
  }




  createChildComponent() {
    const childComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ColisObjetEmballeDemenagementComponent);
    const childComponentRef = this.colisContainer.createComponent(childComponentFactory);
    this.addedNewOne = true
    // Vous pouvez interagir avec la nouvelle instance du composant fils ici si nécessaire
  }

  addDemande(): void {
  // this.demenagementEntityCar= {
  //     villeDepart:this.initialForm.villeDepart,
  //     villeArrivee:this.initialForm.villeArrivee,
  //     adresseDepart:this.initialForm.adresseDepart,
  //     adresseArrivee:this.initialForm.adresseArrivee,
  //     horaire:this.demandeEntityForm.value.horaire,
  //     specificDemande:{
  //         type:this.initialForm.type,
  //         voitureType: this.childData.voitureType,
  //         voiturePrice:this.childData.voiturePrice,
  //         voitureEtat: this.childData.voitureEtat,
  //     }
  // }

  // this.demenagementEntityMoto = {
  //   villeDepart:this.initialForm.villeDepart,
  //     villeArrivee:this.initialForm.villeArrivee,
  //     adresseDepart:this.initialForm.adresseDepart,
  //     adresseArrivee:this.initialForm.adresseArrivee,
  //     horaire:this.demandeEntityForm.value.horaire,
  //     specificDemande:{
  //         type:this.initialForm.type,
  //         motoType: this.childData.motoType,
  //         motoPrice:this.childData.motoPrice,
  //         motoEtat: this.childData.motoEtat,
  //     }
  // }
  const demenagementEntity = this.createDemenagementEntity(this.initialForm.type, this.childData, this.initialForm, this.demandeEntityForm);


    this.demandeService.addDemande(demenagementEntity).subscribe(response => {});
    
  }
   createDemenagementEntity(type: string, childData: any, initialForm: any, demandeEntityForm: any) {
    const commonProperties = new DemandeCommonProperties(
      initialForm.villeDepart,
      initialForm.villeArrivee,
      initialForm.adresseDepart,
      initialForm.adresseArrivee,
      demandeEntityForm.value.horaire,
      initialForm.type
    );
  
    if (type === 'car') {
      return {
        ...commonProperties,
        specificDemande: {
          ...commonProperties,
          voitureType: childData.voitureType,
          voiturePrice: childData.voiturePrice,
          voitureEtat: childData.voitureEtat
        }
      };
    } else if (type === 'moto') {
      return {
        ...commonProperties,
        specificDemande: {
          ...commonProperties,
          motoType: childData.motoType,
          motoPrice: childData.motoPrice,
          motoEtat: childData.motoEtat
        }
      };
    } else {
      throw new Error(`Invalid type: ${type}`);
    }
  }
  
  

  
}
