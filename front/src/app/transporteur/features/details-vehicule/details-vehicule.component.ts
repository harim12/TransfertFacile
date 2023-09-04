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

  constructor(
    private transporteurService: ProfileService,
    private fb: FormBuilder,
    private webSocketService: WebsocketService
  ) {}

 ngOnInit(): void {
    const email = localStorage.getItem("emailTransporteur") || '';
    
    // Initialize the form
    this.transporteurForm = this.fb.group({
      driverLiscence: [''],
      nationalIdentity: [''],
      vehiculeRegistrationNumber: [''],
      email: ['']
    });
  
    this.fetchAndPatchTransporteurData(email);
  
    this.transporteurForm.valueChanges.subscribe((updatedData) => {
    });

    this.webSocketService.subscribe('/topic/update-transporteur', () => {
      this.fetchAndPatchTransporteurData(email);
    });
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
}
