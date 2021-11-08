import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Person } from '../../interfaces/notas.interface';
import { NotasService } from '../../services/notas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router,private notasService:NotasService) { }

  user!:User;

  ngOnInit(): void {
    this.notasService.getUser()
    .subscribe(({user} )=>{
     this.user = user;
    })
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./auth/login']);

  }

}
