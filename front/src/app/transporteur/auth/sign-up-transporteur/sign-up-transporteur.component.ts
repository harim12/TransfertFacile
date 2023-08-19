import { Component } from '@angular/core';
import { TransporteurRegisterDTO } from '../../shared/models/transporteurRegisterDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/user/shared/services/authentication-service.service';
import { TransporteurAuthenticationService } from '../../shared/services/transporteur-authentication.service';

@Component({
  selector: 'app-sign-up-transporteur',
  templateUrl: './sign-up-transporteur.component.html',
  styleUrls: ['./sign-up-transporteur.component.scss']
})
export class SignUpTransporteurComponent {
  registrationForm!:FormGroup ;
  
  constructor(
              private formBuilder:FormBuilder,
              private authenticationService:TransporteurAuthenticationService
              ){}

    ngOnInit(){
      this.registrationForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber:['',[Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    registerTransporteur(){
      console.log("this is inside the register user")
      
        const registrationDTO = new TransporteurRegisterDTO(
          this.registrationForm.value.firstName,
          this.registrationForm.value.lastName,
          this.registrationForm.value.phoneNumber,
          this.registrationForm.value.email,
          this.registrationForm.value.password,

        );
  
        this.authenticationService.registerUser(registrationDTO).subscribe(response => {
          alert("we have sent a verification link to your email")
        },
        error=>{
          if (error.error === 'Email already exists') {
            alert("Email already exists")
          }
          else{
            alert("somthing went wrong");
          }
        }
        
        );
      
    }
}
