import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  activeMessage: boolean = false;
  message: string = '';
  loading:boolean = false;
  ok:boolean = true;
  activeAccount:boolean = false;


  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) { 
  }

  ngOnInit(): void {
  }

  validFields(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
 
    this.loading = true;
    this.activeMessage = false;
    this.activeAccount = false;
    this.authService.login(this.myForm.value)
      .subscribe(resp => {
        localStorage.setItem('token',resp.token);
        this.router.navigate(['./inicio']);
      }, (error: HttpErrorResponse) => {
       this.message = error.error.error;
       if(error.error.code === 1){
         this.activeAccount = true;
       }
        this.activeMessage = true;
        this.ok = false;
        this.loading = false;
      })
    
  }

}
