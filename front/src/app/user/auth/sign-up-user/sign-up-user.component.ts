import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../../shared/services/authentication-service.service';
import { UserRegisterDTO } from '../../models/userRegisterDTO.model';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent {
  registrationForm!:FormGroup ;
  
  constructor(
              private formBuilder:FormBuilder,
              private authenticationService:AuthenticationServiceService
              ){}

    ngOnInit(){
      this.registrationForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    registerUser(){
      console.log("this is inside the register user")
      
        const registrationDTO = new UserRegisterDTO(
          this.registrationForm.value.firstName,
          this.registrationForm.value.lastName,
          this.registrationForm.value.email,
          this.registrationForm.value.password
        );
  
        this.authenticationService.registerUser(registrationDTO).subscribe(response => {
          console.log("GO VERIFY YOU EMAIL, GOO")
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



