import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemenagementFirstFormComponent } from './features/demenagement-first-form/demenagement-first-form.component';
import { DemenagementFormSecondComponent } from './features/demenagement-form-second/demenagement-form-second.component';
import { DevisResultComponent } from './features/devis-result/devis-result.component';
import { HondaDetailComponent } from './honda-detail/honda-detail.component';

const routes: Routes = [
  // Set the default route to DemenagementFirstFormComponent
  { path: '', redirectTo: 'demeFormFirst', pathMatch: 'full' },

  // Define other routes for your components
  { path: 'demeFormFirst', component: DemenagementFirstFormComponent },
  { path: 'demeFormSecond', component: DemenagementFormSecondComponent },
  { path: 'devisResult', component: DevisResultComponent },
  { path: 'hondaDetail', component: HondaDetailComponent },

  // You can add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
