import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Alertism } from 'alertism';

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
  email!:string;
  userUploadedImageUrl: string | ArrayBuffer | null = null; // Initialize with null

  constructor(
    private transporteurService: ProfileService,
    private fb: FormBuilder,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
     this.email = localStorage.getItem("emailTransporteur") || '';
    
    // Initialize the form
    this.transporteurForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      city: ['']
    });
  
  
   
  
    this.fetchAndPatchTransporteurData(this.email);

  }

  fetchAndPatchTransporteurData(email: string): void {
    console.log("fetching data")
    this.transporteurService.getTransporteurPersonalInfo(email).subscribe((data) => {
      this.updateTransporteurForm(data);
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
            this.fetchAndPatchTransporteurData(this.email);
            Alertism({
              alertHeading: "Success",
              alertText: "Data changed succefully:",
            });
          },
          (error) => {
            // Handle any errors that may occur during the update
            Alertism({
              alertHeading: "Failed",
              alertText: "Error updating",
            });
          }
        );
    }
  }

  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }
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
      this.userUploadedImageUrl = e.target?.result as string | ArrayBuffer | null;

    };
    reader.readAsDataURL(selectedImage);
  }
}


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const selectedImage = event.target.files[0];
        this.selectedImageProfile = selectedImage;
        this.userUploadedImageUrl = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
