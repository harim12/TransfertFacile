import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'demeFormFirst',component:DemenagementFirstFormComponent},
  {path:'demeFormSecond',component:DemenagementFormSecondComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
