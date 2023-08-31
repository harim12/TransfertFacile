import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DemandeDemenagement } from '../../shared/models/demande.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeDemenagementService } from '../../shared/services/demande-demenagement.service';

@Component({
  selector: 'app-single-demande',
  templateUrl: './single-demande.component.html',
  styleUrls: ['./single-demande.component.scss']
})
export class SingleDemandeComponent {
  @Input() demande: any | undefined;
   carouselItems = [
    { icon: 'fa-solid fa-couch', title: 'Fautffffeuil' },
  
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit pdfslace' },
    
  ];

  priceSuggestedForm!: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private demandeService:DemandeDemenagementService) {}

  ngOnInit() {
    this.priceSuggestedForm = this.formBuilder.group({
      priceSuggested: ['', Validators.required]
    });
  }

  addPriceSuggestion() {
    let transporteurData: any;
    let transporteurEmail = localStorage.getItem("emailTransporteur");
  
    this.demandeService.getTransporteurInfo(transporteurEmail).subscribe((transporteurInfo) => {
      transporteurData = transporteurInfo;
  
      const priceSuggestionObject = {
        "firstName": transporteurData.firstName,
        "lastName": transporteurData.lastName,
        "carType": transporteurData.carType,
        "demandeID": this.demande.demandeId,
        "email": transporteurEmail,
        "priceSuggestion": this.priceSuggestedForm.value.priceSuggested
      };
      
      console.log("priceSuggestionObject:", priceSuggestionObject); // Confirm object data
  
      // Now call the service to add the price suggestion
      this.demandeService.addPriceSuggestion(priceSuggestionObject).subscribe(
        (response) => {
          console.log("Price suggestion added successfully:", response);
          // You can perform any additional actions after the suggestion is added
        },
        (error) => {
          console.error("Error adding price suggestion:", error);
          // Handle any errors that occur during the POST request
        }
      );
    });
  
    // Note: Code here will run before the subscription block completes, so avoid placing any code here that relies on the data from the subscription.
  }
 
  
  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }
  
}
