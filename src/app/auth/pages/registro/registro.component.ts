
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotasService } from '../../../notas/services/notas.service';
import { Career,  User } from '../../../notas/interfaces/notas.interface';
import { UserRegistration } from '../../interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorService } from '../../../shared/Validators/validator.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  
  userForm!:UserRegistration;
  error: boolean = false;
  message: string = '';
  loading: boolean = false;
  careers: Career[] = [];
  disabledSubmit: boolean = false;
  user!:User;

  

   myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    email: ['', [Validators.required,Validators.pattern(this.vs.emailPattern)]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birthdate: [, [Validators.required,this.vs.birthdateValidation]],
    gender: ['', [Validators.required]],
    career: ['', [Validators.required]],
   })



  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,
    private notasService: NotasService, private vs:ValidatorService) { }

  ngOnInit(): void {
    this.notasService.getCareers().subscribe(resp => this.careers = resp.career, _ => this.careers = []);
  }

  

  //Mensajes de error

  validFields(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

   UserErrorMessage(field:string):string{
    const errors = this.myForm.get(field)?.errors;
    if(errors?.required){
      return "El "+field+" no puede quedar vacio";
    }else{
      return "El "+field+" debe contener entre 6 y 20 caracteres"
    }
  }

  emailErrorMessage():string{
    const errors = this.myForm.get('email')?.errors;
    if(errors?.required){
      return "El email no puede quedar vacio";
    }else{
      return "El email es invalido"
    }
  }

  birthdateErrorMessage():string{
    const errors = this.myForm.get('birthdate')?.errors;
    if(errors?.required){
      return "La fecha de nacimiento no puede quedar vacio";
    }else{
      return "La fecha de nacimiento es invalida"
    }
  }



//Peticiones http
 

  registration() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.disabledSubmit = true;

    this.userForm = this.myForm.value;
    this.user = {
      username: this.userForm.username,
      password:this.userForm.password,
      person:{
        name: this.userForm.name,
        lastname: this.userForm.lastname,
        email: this.userForm.email,
        birthdate: this.userForm.birthdate,
        gender: this.userForm.gender,  
      }
    }

    this.loading = true;
    this.error = false;
    this.authService.registration(this.user,this.userForm.career)
      .subscribe(resp => {
        console.log(resp.user);
        this.disabledSubmit = false;
      }, (error: HttpErrorResponse) => {
        this.message = error.error.message
        this.error = true;
        this.disabledSubmit = false;
        this.loading = false;
      })

  }
}
