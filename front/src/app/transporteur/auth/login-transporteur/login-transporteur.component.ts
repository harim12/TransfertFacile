import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/user/shared/services/authentication-service.service';
import { TransporteurLoginDTO } from '../../shared/models/transporteurLoginDTO';
import { TransporteurAuthenticationService } from '../../shared/services/transporteur-authentication.service';
import { Alertism } from 'alertism';

@Component({
  selector: 'app-login-transporteur',
  templateUrl: './login-transporteur.component.html',
  styleUrls: ['./login-transporteur.component.scss']
})
export class LoginTransporteurComponent {
  loginForm!:FormGroup ;
 
  constructor(
              private formBuilder:FormBuilder,
              private authenticationService:TransporteurAuthenticationService,
              private router: Router // Inject the Router service
              ){}

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    loginTransporteur(){
       console.log("inside the login")
      
        const registrationDTO = new TransporteurLoginDTO(
         
          this.loginForm.value.email,
          this.loginForm.value.password
        );
  
      if(this.loginForm.valid){
        this.authenticationService.loginUser(registrationDTO).subscribe(response => {
          if(response.jwt==''){
            Alertism({
              alertHeading: "Failed",
              alertText: "Wrong credential",
            });
          }
          else{
            this.router.navigate(['/transporteurs'])
            localStorage.setItem("jwtTransporteur",response.jwt)
            localStorage.setItem("emailTransporteur",response.user.email)
          }
        },
        error=>{
          Alertism({
            alertHeading: "Failed",
            alertText: "Something went wrong",
          });
        }
        );
      }
          
         
        
        
      
    }
}
