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
import { LatLngTuple, Map, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import * as NodeGeocoder from 'node-geocoder';
import { latLng, LatLngBounds } from 'leaflet';
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
  address = " Oujda, Pachalik d'Oujda, Préfecture d'Oujda-Angad, Oriental, Maroc"
  latitude: number | undefined;
  longitude: number | undefined;
  map:any;
  startAddress = 'Oujda';
  endAddress = 'rabat'
  distance!:number;
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
   
    this.startAddress = `${this.initialForm.villeDepart} ${this.initialForm.adresseDepart}`
    this.endAddress = `${this.initialForm.villeArrivee} ${this.initialForm.adresseArrivee}`
    

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

  ngAfterViewInit(){
     this.initMap();
  }


  private initMap(): void {
    // Replace this with your access token
    const accessToken = 'pk.7b2e13aa2974c728148b2aa271d4d324';
  
    const geocodingUrlStart = `https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(this.startAddress)}&format=json`;
    const geocodingUrlEnd = `https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(this.endAddress)}&format=json`;
  
    // Initialize the map
    this.map = new Map('map').setView([0, 0], 13);
  
    // Add a tile layer
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  
    fetch(geocodingUrlStart)
    .then(response => response.json())
    .then(startData => {
      const startLat = startData[0].lat;
      const startLon = startData[0].lon;

      // Fetch geolocation for end address
      fetch(geocodingUrlEnd)
        .then(response => response.json())
        .then(endData => {
          const endLat = endData[0].lat;
          const endLon = endData[0].lon;

          // Create LatLngTuple for start and end points
          const startPointTuple: LatLngTuple = [startLat, startLon];
          const endPointTuple: LatLngTuple = [endLat, endLon];

          // Create a polyline between the start and end addresses
          let latLngs: LatLngTuple[] = [startPointTuple, endPointTuple];

          // If the geocoding based on addresses fails, use only the city names
          if (!startLat || !startLon || !endLat || !endLon) {
            latLngs = []; // Empty the latLngs array to avoid errors
            console.log("Geocoding based on addresses failed. Using city names for drawing the line.");
          }

          const polylines = polyline(latLngs, { color: 'blue' }).addTo(this.map);

          if (latLngs.length > 0) {
            // Create a bounding box for the polyline and markers
            const bounds = latLngBounds(latLngs);

            // Fit the map view to show the polyline and markers
            this.map.fitBounds(bounds);

            // Add a marker for the start address or city
            marker(startPointTuple).addTo(this.map)
              .bindPopup(this.startAddress)
              .openPopup();

            // Add a marker for the end address or city
            marker(endPointTuple).addTo(this.map)
              .bindPopup(this.endAddress)
              .openPopup();
               this.distance = this.calculateDistance(startLat, startLon, endLat, endLon);
              console.log(`Distance: ${this.distance.toFixed(2)} km`);
          }
        });
    });
    
}

// Calculate the distance between two points using Haversine formula
toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = this.toRadians(lat2 - lat1);
  const dLon = this.toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
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
