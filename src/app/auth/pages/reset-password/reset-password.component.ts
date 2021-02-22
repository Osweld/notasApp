import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/Validators/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  message: string = '';
  loading: boolean = false;
  error: boolean = false
  disabledSubmit: boolean = false;

  myForm: FormGroup = this.fb.group({
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    password2: ['', [Validators.required]],
  }, {
    Validators: [this.vs.samePassword('password', 'password2')]
  })

  constructor(private fb: FormBuilder, private vs: ValidatorService, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

  }

  validPassword(field:string) {
    return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched
  }

  passwordErrorMessage(): string {
    const errors = this.myForm.get('password')?.errors; 
    if (errors?.required) {
      return "La contraseña no puede quedar vacia";
    } else {
      return "La contraseña debe contener entre 6 y 20 caracteres"
    }
  }


  password2ErrorMessage(): string {
    const errors = this.myForm.get('password2')?.errors;
    if (errors?.required) {
      return "La confirmacion de contraseña no puede quedar vacia";
    } else {
      return "Las contraseñas no coinciden"
    }
  }


  sendEmail() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.disabledSubmit = true;
    this.authService.resetPasswordToken(this.myForm.value)
      .subscribe(resp => {
        this.loading = false;
        console.log(resp);

      }, error => {
        console.log(error);
        this.message = error.error.message
        this.error = true;
        this.loading = false;
      })
  }

}
