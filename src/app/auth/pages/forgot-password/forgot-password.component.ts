import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/Validators/validator.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  message:string ='';
  loading:boolean=false;
  error:boolean=false
  disabledSubmit:boolean = false;

  myForm:FormGroup = this.fb.group({
    email:['',[Validators.required,Validators.pattern(this.vs.emailPattern)]]
  })

  constructor(private fb:FormBuilder,private vs:ValidatorService,private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
  }


  validEmail(){
    return this.myForm.get('email')?.errors && this.myForm.get('email')?.touched
  }

  emailErrorMessage():string{
    const errors = this.myForm.get('email')?.errors;
    if(errors?.required){
      return "El email no puede quedar vacio";
    }else{
      return "El email es invalido"
    }
  }


  sendEmail(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.disabledSubmit = true;
    this.authService.sendResetPassword(this.myForm.value)
    .subscribe(resp =>{
      this.loading = false;
      console.log(resp);
      
    },error => {
      console.log(error);
      this.message = error.error.message
      this.error = true;
      this.loading = false;
      this.disabledSubmit = false;
    })
  }

}
