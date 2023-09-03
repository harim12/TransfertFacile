import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-details-mot-de-passe',
  templateUrl: './details-mot-de-passe.component.html',
  styleUrls: ['./details-mot-de-passe.component.scss']
})
export class DetailsMotDePasseComponent {
  passwordForm!:FormGroup;
  submitted = false;
  passwordsMatch = false;
  constructor(private fb:FormBuilder,private transporteurService: ProfileService,
    ){}
  ngOnInit(){
    this.passwordForm = this.fb.group({
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      newMatchingPassword:['',Validators.required],
      email:[localStorage.getItem("emailTransporteur")],
      
    }
    ,
    {
      validators: this.passwordMatchValidator // Add custom validator
    }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('newMatchingPassword');
  
    if (newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
  checkPasswordMatch() {
   // Check if passwordForm and its controls exist before accessing their values
if (this.passwordForm) {
  const newPassword = this.passwordForm.get('newPassword')?.value;
  const newMatchingPassword = this.passwordForm.get('newMatchingPassword')?.value;

  if (newPassword !== undefined && newMatchingPassword !== undefined) {
    // Now you can safely use newPassword and newMatchingPassword
    this.passwordsMatch = newPassword === newMatchingPassword;
  }
}

  }
  

  changePassword() {
    this.checkPasswordMatch()
    this.submitted = true;
    //if (this.passwordForm.valid) {
      const { email, oldPassword, newPassword } = this.passwordForm.value;
  
      const passwordData = {
        oldPassword,
        newPassword,
        email
      };
      console.log("this is the password data",passwordData)

      // Call the updatePassword method from your service
     if(this.passwordsMatch){
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
     }
    // } else {
    //   // Form is invalid, handle it accordingly (e.g., show error messages)
    //   console.log('Form is invalid. Passwords do not match.');
    // }
  }
  }
  

