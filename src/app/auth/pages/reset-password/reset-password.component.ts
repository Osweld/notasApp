import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/Validators/validator.service';
import { Password } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  message: string = '';
  loading: boolean = false;
  activeMessage: boolean = false
  ok:boolean = false;
  token:string = '';
  password!:Password;

  myForm: FormGroup = this.fb.group({
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    password2: ['', [Validators.required]],
  }, {
    Validators: [this.vs.samePassword('password', 'password2')]
  })

  constructor(private fb: FormBuilder, private vs: ValidatorService, private router: Router,
    private authService: AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( ({token}) =>{
      this.token = token;
    })
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
//9f2d4867-e124-4aa7-bea9-1547fec3f5b9

  sendEmail() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    
    this.password = this.myForm.value
    this.authService.resetPasswordToken(this.token,this.password)
      .subscribe(resp => {
        this.message = "La contraseña a sido cambiada exitosamente"
        this.loading = false;
        this.activeMessage = true;
        this.ok = true
        this.myForm.reset();
        console.log(resp);

      }, error => {
        console.log(error);
        this.message = error.error.error
        this.activeMessage = true;
        this.loading = false;
        this.ok = false
      })
  }

}
