import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
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



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DemenagementFirstFormComponent,    
    HomeDemenagementComponent,
    DemenagementFormSecondComponent,
    DevisResultComponent,
    HondaDetailComponent,
    MotoDemenagementComponent,
    VoitureDemenagementComponent,
    ColisObjetEmballeDemenagementComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
