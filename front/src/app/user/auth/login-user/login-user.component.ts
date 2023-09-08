import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../../shared/services/authentication-service.service';
import { UserLoginDTO } from '../../models/userLoginDTO.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeIDService } from '../../shared/services/demande-id.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  loginForm!:FormGroup ;
  returnUrl!: string; // To store the previous route URL
  demandeId:any;
  constructor(
              private formBuilder:FormBuilder,
              private authenticationService:AuthenticationServiceService,
              private demandeIdService:DemandeIDService,
              private router: Router,
              private route: ActivatedRoute,
              // Inject the Router service
              ){}

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/devisResult';

    }

    
  loginUser(): void {
    const registrationDTO = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if (this.loginForm.valid) {
      this.authenticationService.loginUser(registrationDTO).subscribe(
        (response) => {
          if (response.jwt === '') {
            alert('Wrong credentials');
          } else {
            // Store JWT token and user info
            localStorage.setItem('jwtUser', response.jwt);
            localStorage.setItem('idUser', response.user.userId);
            localStorage.setItem('emailUser', response.user.email);
            this.demandeId  = this.demandeIdService.getDemandeId();
            console.log(this.demandeId)

            // Navigate back to the previous route or '/devisResult' if there's no previous route
            this.router.navigate([this.returnUrl], { queryParams: { demandeId: this.demandeId } });
          }
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
  }
}
