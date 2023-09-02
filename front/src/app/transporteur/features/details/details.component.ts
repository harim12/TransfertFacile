import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  transporteurInfo: any = {};
  transporteurForm!: FormGroup;
  selectedImageProfile!: File;
  dragging: boolean = false;
  displayedImageUrl: string | null = null;

  constructor(
    private transporteurService: ProfileService,
    private fb: FormBuilder,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem("emailTransporteur") || '';
    
    // Initialize the form
    this.transporteurForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      city: ['']
    });
  
    // Retrieve and update transporteur data
    this.fetchAndPatchTransporteurData(email);
  
    // Subscribe to form value changes
    this.transporteurForm.valueChanges.subscribe((updatedData) => {
      // Handle form value changes here if needed
    });

    // Subscribe to WebSocket updates
    this.webSocketService.subscribe('/topic/update-transporteur', () => {
      // When a WebSocket update is received, fetch and patch transporteur data
      this.fetchAndPatchTransporteurData(email);
    });
  }

  fetchAndPatchTransporteurData(email: string): void {
    this.transporteurService.getTransporteurPersonalInfo(email).subscribe((data) => {
      // Update the form controls with the fetched data
      this.updateTransporteurForm(data);
      // Assign the fetched data to your class variable for reference
      this.transporteurInfo = data;
      console.log(this.transporteurInfo);
    });
  }

  updateTransporteurForm(data: any): void {
    this.transporteurForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city
    });
  }

  updateTransporteur() {
    console.log("inside update")
    if (this.transporteurForm.valid && this.selectedImageProfile) {
      const updatedData = this.transporteurForm.value;
      this.transporteurService
        .updateTransporteurInfo(updatedData, this.selectedImageProfile)
        .subscribe(
          (response) => {
            // Handle the successful update, if needed
            console.log('Update successful', response);
          },
          (error) => {
            // Handle any errors that may occur during the update
            console.error('Update error', error);
          }
        );
    }
  }

  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }
// Add these event handlers
onDragOver(event: DragEvent): void {
  event.preventDefault();
  this.dragging = true;
  console.log("I am dragging")
}

onDrop(event: DragEvent): void {
  event.preventDefault();
  console.log("I am dropping")
  this.dragging = false;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const selectedImage = files[0];

    // Read the selected image and convert it to a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.displayedImageUrl = e.target.result; // Update the displayed image URL
      this.selectedImageProfile = selectedImage;
    };
    reader.readAsDataURL(selectedImage);
  }
}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      this.selectedImageProfile = selectedImage;
    
    }
  }
}
