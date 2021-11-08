import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  isSmall:boolean = true;
  bigForm:string = '/auth/registro';

  constructor(private location:Location,private router:Router) { 
    this.location.onUrlChange(url =>{
      url === this.bigForm ? this.isSmall = false : this.isSmall = true;
    })
  }
  ngOnInit(): void {
    this.router.url === this.bigForm ? this.isSmall = false : this.isSmall = true;
  }


}
