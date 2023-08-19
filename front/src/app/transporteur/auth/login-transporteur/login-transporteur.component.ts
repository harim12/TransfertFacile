import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/user/shared/services/authentication-service.service';
import { TransporteurLoginDTO } from '../../shared/models/transporteurLoginDTO';
import { TransporteurAuthenticationService } from '../../shared/services/transporteur-authentication.service';

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
            alert("wrong credentials")
          }
          else{
            this.router.navigate(['/demeFormFirst'])
            localStorage.setItem("jwt",response.jwt)
            localStorage.setItem("id",response.user.userId)
            localStorage.setItem("email",response.user.email)
          }
        },
        error=>{
          alert("somthing went wrong")
        }
        );
      }
          
         
        
        
      
    }
}
