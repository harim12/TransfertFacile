import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-details-vehicule',
  templateUrl: './details-vehicule.component.html',
  styleUrls: ['./details-vehicule.component.scss']
})
export class DetailsVehiculeComponent {
  transporteurForm!: FormGroup;
  transporteurInfo!:any;
  selectedVehiculeImage!: File;
  email!:string;

  constructor(
    private transporteurService: ProfileService,
    private fb: FormBuilder,
    private webSocketService: WebsocketService
  ) {}

 ngOnInit(): void {
     this.email = localStorage.getItem("emailTransporteur") || '';
    
    // Initialize the form
    this.transporteurForm = this.fb.group({
      driverLiscence: [''],
      nationalIdentity: [''],
      vehiculeRegistrationNumber: [''],
      email: ['']
    });
  
  
    this.transporteurForm.valueChanges.subscribe((updatedData) => {
    });

    // this.webSocketService.subscribe('/topic/update-vehicule-info', () => {
    //   this.fetchAndPatchTransporteurData(this.email);
    // });
    this.fetchAndPatchTransporteurData(this.email);

  }


  fetchAndPatchTransporteurData(email: string): void {
    this.transporteurService.getTransporteurVehiculeInfo(email).subscribe((data) => {
      this.updateTransporteurForm(data);
      this.transporteurInfo = data;
      console.log(this.transporteurInfo)

    });
  }

  updateTransporteurForm(data: any): void {
    this.transporteurForm.patchValue({
      driverLiscence: data.driverLiscence,
      nationalIdentity: data.nationalIdentity,
      vehiculeRegistrationNumber: data.vehiculeRegistrationNumber,
      email: data.email
    });
  }

  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }

  updateTransporteur() {
    console.log("inside update")
    if (this.transporteurForm.valid && this.selectedVehiculeImage) {
      const updatedData = this.transporteurForm.value;
      this.transporteurService
        .updateTransporteurVehiculeInfo(updatedData, this.selectedVehiculeImage)
        .subscribe(
          (response) => {
            this.fetchAndPatchTransporteurData(this.email)
            console.log('Update successful', response);
          },
          (error) => {
            // Handle any errors that may occur during the update
            console.error('Update error', error);
          }
        );
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      this.selectedVehiculeImage = selectedImage;
    
    }
  }
}
