import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // Set the default route to '/users/demeFormFirst'
  { path: '', redirectTo: '/transporteurs/dashbord/demandes', pathMatch: 'full' },

  // Lazy load the UserModule
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path:'transporteurs',
    loadChildren:() => import('./transporteur/transporteur.module').then(m => m.TransporteurModule),
  }
  // Other routes for other features can be defined here
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
