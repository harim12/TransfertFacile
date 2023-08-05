import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransporteurRoutingModule } from './transprteur-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { DashbordComponent } from './features/dashbord/dashbord.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { BodyComponent } from './features/body/body.component';
import { DemandeTransfertComponent } from './features/demande-transfert/demande-transfert.component';
import { ProjetTransfertComponent } from './features/projet-transfert/projet-transfert.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ProductivityComponent } from './features/productivity/productivity.component';
import { ListDemandesComponent } from './features/list-demandes/list-demandes.component';
import { SingleDemandeComponent } from './features/single-demande/single-demande.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { ListProjetsComponent } from './features/list-projets/list-projets.component';
import { SingleProjetComponent } from './features/single-projet/single-projet.component';
import { DetailsComponent } from './features/details/details.component';
import { DetailsVehiculeComponent } from './features/details-vehicule/details-vehicule.component';
import { DetailsMotDePasseComponent } from './features/details-mot-de-passe/details-mot-de-passe.component';
import { DetailsPaimentComponent } from './features/details-paiment/details-paiment.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    // Other transporteur-related components
    HeaderComponent,
    DashbordComponent,
    SidenavComponent,
    BodyComponent,
    DemandeTransfertComponent,
    ProjetTransfertComponent,
    ProfileComponent,
    ProductivityComponent,
    ListDemandesComponent,
    SingleDemandeComponent,
    CarouselComponent,
    ListProjetsComponent,
    SingleProjetComponent,
    DetailsComponent,
    DetailsVehiculeComponent,
    DetailsMotDePasseComponent,
    DetailsPaimentComponent,
    
  ],
  imports: [
    CommonModule,
    // Other transporteur-related imports
    TransporteurRoutingModule,
    SlickCarouselModule,
    FormsModule
  ],

})
export class TransporteurModule { }
