import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './features/dashbord/dashbord.component';
import { DemandeTransfertComponent } from './features/demande-transfert/demande-transfert.component';
import { ProjetTransfertComponent } from './features/projet-transfert/projet-transfert.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProductivityComponent } from './features/productivity/productivity.component';
import { SingleDemandeComponent } from './features/single-demande/single-demande.component';
import { AuthTransporteurComponent } from './auth-transporteur/auth-transporteur.component';
import { LoginTransporteurComponent } from './login-transporteur/login-transporteur.component';
import { SignUpTransporteurComponent } from './sign-up-transporteur/sign-up-transporteur.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
  { path: 'dashbord', component: DashbordComponent, children: [
    { path: '', redirectTo: 'demandes', pathMatch: 'full' },
    { path: 'demandes', component: DemandeTransfertComponent },
    { path: 'projet', component: ProjetTransfertComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'productivity', component: ProductivityComponent },
    { path: 'single',component:SingleDemandeComponent},
    { path: 'auth',component:AuthTransporteurComponent},
    { path: 'login-transporteur',component:LoginTransporteurComponent},
    { path: 'signup-transporteur',component:SignUpTransporteurComponent}

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporteurRoutingModule { }
