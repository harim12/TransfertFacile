import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent {
  displayLogin:boolean=true;
  displaySignUp:boolean = false;

  displaySignUpFunc(){
    this.displaySignUp = true
    this.displayLogin  = false
  }
  displayLoginFunc(){
    this.displayLogin = true;
    this.displaySignUp = false;
  }
}