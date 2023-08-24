import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { SelectedOptionService } from '../../shared/services/selected-option.service';
import { ColisObjetEmballeDemenagementComponent } from '../colis-objet-emballe-demenagement/colis-objet-emballe-demenagement.component';
import { DemandesService } from '../../shared/services/demandes.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemenagementRequestVoiture } from '../../shared/models/DemenagementRequestVoiture.model';
import { DemandeCommonProperties } from '../../shared/models/demandeCommonProperties.model';
import { SelectedItemsHomeService } from '../../shared/services/selected-items-home.service';
import { Router } from '@angular/router';

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
  optionLogistiqueHomeForm!:FormGroup;
  selectedHomeItems:any;
  demenagementEntityCar!:DemenagementRequestVoiture;
  demenagementEntityMoto:any;
  

  @ViewChild('colisContainer', { read: ViewContainerRef }) colisContainer!: ViewContainerRef;

  constructor(public selectedOptionService:SelectedOptionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private demandeService:DemandesService,
              private webSocketService:WebsocketService,
              private formBuilder:FormBuilder,
              private selectedItemsHomeService:SelectedItemsHomeService,
              private router:Router
              ) {}


  ngOnInit(){

    this.initialForm = history.state.formData;

    this.demandeEntityForm = this.formBuilder.group({
      horaire: ['', Validators.required],   
    });

    this.optionLogistiqueHomeForm= this.formBuilder.group({
      enlevementType:['',Validators.required],
      enlevementEtage:['',Validators.required],
      enlevementAvecSansAssenceur:[false,Validators.required],
      livraisonType:['',Validators.required],
      livraisonEtage:['',Validators.required],
      livraisonAvecSansAssenceur:[false,Validators.required],
    })
  
   
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
  this.selectedHomeItems = this.selectedItemsHomeService.getSelectedItems();
  const demenagementEntity = this.createDemenagementEntity(this.initialForm.type, this.childData, this.initialForm, this.demandeEntityForm);
  
    this.demandeService.addDemande(demenagementEntity).subscribe(response => {
      this.router.navigate(['/devisResult'], { queryParams: { demandeId: response.demandeId } });
      console.log("this is the id in the demandeSecond===>",response.demandeId)
    });
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
          type: commonProperties.type,
          voitureType: childData.voitureType,
          voiturePrice: childData.voiturePrice,
          voitureEtat: childData.voitureEtat
        }
      };
    } else if (type === 'moto') {
      return {
        ...commonProperties,
        specificDemande: {
          type: commonProperties.type,
          motoType: childData.motoType,
          motoPrice: childData.motoPrice,
          motoEtat: childData.motoEtat
        }
      };
    } else if(type === 'house'){

      let resultString = "";

      for (const item of this.selectedHomeItems) {
        if (item.isChecked) {
          resultString += `${item.itemName} ${item.quantity}\n`;
        }
      }
      return {
        ...commonProperties,
        specificDemande:{
          type: commonProperties.type,
          items:resultString,
          enlevementType:this.optionLogistiqueHomeForm.value.enlevementType ,
          enlevementEtage:this.optionLogistiqueHomeForm.value.enlevementEtage,
          enlevementAvecSansAssenceur:false,
          livraisonType:this.optionLogistiqueHomeForm.value.livraisonType,
          livraisonEtage:this.optionLogistiqueHomeForm.value.livraisonEtage,
          livraisonAvecSansAssenceur:true
        }
      }
    }

    else {
      throw new Error(`Invalid type: ${type}`);
    }
  }
  
  

  
}
