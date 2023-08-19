import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-trans',
  templateUrl: './auth-trans.component.html',
  styleUrls: ['./auth-trans.component.scss']
})
export class AuthTransComponent {
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
