import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { DemenagementSecondFormComponent } from './features/demenagement-second-form/demenagement-second-form.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'demeFormFirst',component:DemenagementFirstFormComponent},
  {path:'demeFormSecond',component:DemenagementSecondFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
