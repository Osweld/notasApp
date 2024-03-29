import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ResendEmailComponent } from './pages/resend-email/resend-email.component';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, ForgotPasswordComponent, ActiveAccountComponent, ResetPasswordComponent, LoadingComponent, MessageComponent, AuthComponent, ResendEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
