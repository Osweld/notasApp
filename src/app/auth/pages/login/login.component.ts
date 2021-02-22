import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  message: string = '';
  loading:boolean = false;
  disabledSubmit: boolean = false;

  myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) { }

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
    this.disabledSubmit = true;
    this.loading = true;
    this.error = false;
    this.authService.login(this.myForm.value)
      .subscribe(resp => {
        localStorage.setItem('token',resp.token);
        this.router.navigate(['./inicio']);
      }, (error: HttpErrorResponse) => {
        this.message = error.error.message
        this.error = true;
        this.loading = false;
        this.disabledSubmit = false;
      })
    
  }

}
