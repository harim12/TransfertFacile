import { Component } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  transporteurInfo: any = {};
  transporteurForm!: FormGroup;


  constructor(
              private transporteurService: ProfileService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    const email = localStorage.getItem("emailTransporteur");
    this.transporteurForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      city: ['']
    });
  
    // Retrieve data from your service
    this.transporteurService.getTransporteurPersonalInfo(email).subscribe((data) => {
      // Update the form controls with the fetched data
      this.transporteurForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        city: data.city
      });
  
      // Assign the fetched data to your class variable for reference
      this.transporteurInfo = data;
      console.log(this.transporteurInfo)
    });
  
    // Subscribe to form value changes
    this.transporteurForm.valueChanges.subscribe((updatedData) => {
      // Handle form value changes here if needed
    });
  }
  

  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }

  
  
  
  
  

    
  }

