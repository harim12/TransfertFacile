import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAcountComponent } from './access-acount/access-acount.component';

const appRoutes: Routes = [
  // Set the default route to '/users/demeFormFirst'
  // { path: '', redirectTo: '/transporteurs/dashbord/demandes', pathMatch: 'full' },

  // Lazy load the UserModule

  { path: '', redirectTo: './user/user.module', pathMatch: 'full' },

  
  {
    path:'transporteurs',
    loadChildren:() => import('./transporteur/transporteur.module').then(m => m.TransporteurModule),
  },
  {path:'access-acount',component:AccessAcountComponent}
  // Other routes for other features can be defined here
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
