import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },{
    path:'',
    loadChildren:()=> import('./notas/notas.module').then(m => m.NotasModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },{
    path:'404',component:ErrorPageComponent
  },{
    path:'**',redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
