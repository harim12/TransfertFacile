import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';
import { DevisResultComponent } from './features/devis-result/devis-result.component';
import { HondaDetailComponent } from './honda-detail/honda-detail.component';
import { HomeComponent } from './core/home/home.component';
import { VoitureDemenagementComponent } from './features/voiture-demenagement/voiture-demenagement.component';
import { MotoDemenagementComponent } from './features/moto-demenagement/moto-demenagement.component';
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { SignUpUserComponent } from './auth/sign-up-user/sign-up-user.component';
import { AuthUserComponent } from './auth/auth-user/auth-user.component';

const routes: Routes = [
  // Set the default route to DemenagementFirstFormComponent
  { path: '', redirectTo: 'demeFormFirst', pathMatch: 'full'},
  // Define other routes for your components
  { path: 'demeFormFirst', component: DemenagementFirstFormComponent },
  { path: 'demeFormSecond', component: DemenagementFormSecondComponent },
  { path: 'devisResult', component: DevisResultComponent },
  { path: 'hondaDetail', component: HondaDetailComponent },
  { path: 'login-user',component:LoginUserComponent},
  { path: 'signup-user',component:SignUpUserComponent},
  { path: 'auth-user',component:AuthUserComponent}

  // You can add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
