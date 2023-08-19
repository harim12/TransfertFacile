import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../../shared/services/authentication-service.service';
import { UserLoginDTO } from '../../models/userLoginDTO.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  loginForm!:FormGroup ;
 
  constructor(
              private formBuilder:FormBuilder,
              private authenticationService:AuthenticationServiceService,
              private router: Router // Inject the Router service
              ){}

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    loginUser(){
       console.log("inside the login")
      
        const registrationDTO = new UserLoginDTO(
         
          this.loginForm.value.email,
          this.loginForm.value.password
        );
  
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
        });
      
    }
}
