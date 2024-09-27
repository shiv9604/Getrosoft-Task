import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch : 'full'
  },
  {
    path: 'home',
    canActivate : [authGuard],
    loadComponent: () => import("./features/home/home.component").then((m) => m.HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () => import("./features/auth/register/register.component").then((m) => m.RegisterComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
