import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {



  token: string = '';
  message: string = '';
  ok: boolean = false;
  activeMessage: boolean = false;
  activatedAccount: boolean = true;
  loading = true


  constructor(
    private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ token }) => {
      this.token = token;
    })

    this.authService.activeAccountToken(this.token)
      .subscribe(resp => {
        this.ok = true; 
        this.activatedAccount = true
        this.activeMessage = true;
        this.loading = false;
        this.message = "Se a activado exitosamente la cuenta"
        console.log(resp)
      },(error: HttpErrorResponse) => {
        this.ok = false;
        this.activeMessage = true;
        this.message = error.error.error;
        this.activatedAccount = false
        this.loading = false
      })

  }
}