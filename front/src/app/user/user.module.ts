import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../transporteur/core/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { HomeDemenagementComponent } from './features/home-demenagement/home-demenagement.component';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';
import { DevisResultComponent } from './features/devis-result/devis-result.component';
import { HondaDetailComponent } from './honda-detail/honda-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { MotoDemenagementComponent } from './features/moto-demenagement/moto-demenagement.component';
import { VoitureDemenagementComponent } from './features/voiture-demenagement/voiture-demenagement.component';
import { ColisObjetEmballeDemenagementComponent } from './features/colis-objet-emballe-demenagement/colis-objet-emballe-demenagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { SignUpUserComponent } from './auth/sign-up-user/sign-up-user.component';
import { AuthUserComponent } from './auth/auth-user/auth-user.component';
import { AccessAcountComponent } from './access-acount/access-acount.component';
import { NavbareComponent } from './core/navbare/navbare.component';
import { ItemRowComponent } from './core/item-row/item-row.component';



@NgModule({
  declarations: [
    HomeComponent,
    DemenagementFirstFormComponent,    
    HomeDemenagementComponent,
    DemenagementFormSecondComponent,
    DevisResultComponent,
    HondaDetailComponent,
    MotoDemenagementComponent,
    VoitureDemenagementComponent,
    ColisObjetEmballeDemenagementComponent,
    LoginUserComponent,
    SignUpUserComponent,
    AuthUserComponent,
    // NavbarComponent,
    AccessAcountComponent,
    NavbareComponent,
    ItemRowComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
