import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { TransporteurModule } from './transporteur/transporteur.module';
import { AccessAcountComponent } from './user/access-acount/access-acount.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    TransporteurModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
