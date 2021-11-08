import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/Validators/validator.service';
import { Email } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.css']
})
export class ResendEmailComponent implements OnInit {
  message:string ='';
  loading:boolean=false;
  activeMessage:boolean=false
  ok:boolean = false;
  email!:Email;

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
    this.email =this.myForm.value
    this.authService.sendActiveAccountMail(this.email.email)
    .subscribe(resp =>{
      this.message = 'Email enviado correctamente';
      this.ok = true;
      this.activeMessage = true;
      this.loading = false;
      console.log(resp);
      
    },(error:HttpErrorResponse) => {
      console.log(error);
      this.message = error.error.message
      this.activeMessage = true;
      this.loading = false;
      this.ok = false;
    })
  }

}

