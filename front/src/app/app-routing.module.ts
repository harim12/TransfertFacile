import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';
import { DevisResultComponent } from './features/devis-result/devis-result.component';
import { HondaDetailComponent } from './honda-detail/honda-detail.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'demeFormFirst',component:DemenagementFirstFormComponent},
  {path:'demeFormSecond',component:DemenagementFormSecondComponent},
  {path:'devisResult',component:DevisResultComponent},
  {path:'hondaDetail',component:HondaDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
