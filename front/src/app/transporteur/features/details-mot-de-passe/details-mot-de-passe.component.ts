import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-details-mot-de-passe',
  templateUrl: './details-mot-de-passe.component.html',
  styleUrls: ['./details-mot-de-passe.component.scss']
})
export class DetailsMotDePasseComponent {
  passwordForm!:FormGroup;
  constructor(private fb:FormBuilder,private transporteurService: ProfileService,
    ){}
  ngOnInit(){
    this.passwordForm = this.fb.group({
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      newMatchingPassword:['',Validators.required],
      email:[localStorage.getItem("emailTransporteur")],
      
    }
    //,
    // {
    //   validators: this.passwordMatchValidator // Add custom validator
    // }
    );
  }

   passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const verifyNewPassword = control.get('verifyNewPassword');
  
    if (newPassword && verifyNewPassword && newPassword.value !== verifyNewPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  changePassword() {
    //if (this.passwordForm.valid) {
      const { email, oldPassword, newPassword } = this.passwordForm.value;
  
      const passwordData = {
        oldPassword,
        newPassword,
        email
      };
      console.log("this is the password data",passwordData)

      // Call the updatePassword method from your service
      this.transporteurService.updatePassword(passwordData).subscribe(
        (response) => {
          
        },
        (error) => {
          if (error.status === 200) {
            // Password changed successfully$

            alert('Password changed successfully.');
          } else if (error.status === 400) {
            // Bad Request (e.g., old password is incorrect)
            alert('Bad Request: The old password is incorrect.');
          }
          // Handle other HTTP errors
          console.error('Error updating password:', error);
        }
      );
    // } else {
    //   // Form is invalid, handle it accordingly (e.g., show error messages)
    //   console.log('Form is invalid. Passwords do not match.');
    // }
  }
  }
  

