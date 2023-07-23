import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { RouterModule } from '@angular/router';
import { DemenagementFormComponent } from './features/demenagement-form/demenagement-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DemenagementFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add RouterModule to the imports array

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
