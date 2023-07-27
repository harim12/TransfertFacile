import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { RouterModule } from '@angular/router';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { HomeDemenagementComponent } from './features/home-demenagement/home-demenagement.component';
import { MatTabsModule } from '@angular/material/tabs'; // Import the MatTabsModule
import { HttpClientModule } from '@angular/common/http';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';
import { DevisResultComponent } from './features/devis-result/devis-result.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DemenagementFirstFormComponent,    
    HomeDemenagementComponent,
    DemenagementFormSecondComponent,
    DevisResultComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to the imports array
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
