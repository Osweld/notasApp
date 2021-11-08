import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoggedInGuard } from './auth/guards/logged-in.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[LoggedInGuard],
    canLoad:[LoggedInGuard]
  },{
    path:'',
    loadChildren:()=> import('./notas/notas.module').then(m => m.NotasModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },{
    path:'404',component:ErrorPageComponent
  },{
    path:'**',redirectTo:'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
