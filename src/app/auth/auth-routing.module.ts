import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'login',component:LoginComponent},
      {path:'registro',component:RegistroComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'active-account',component:ActiveAccountComponent},
      {path:'reset-password',component:ResetPasswordComponent},
      {path:'**',redirectTo:'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
