import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  title: string;

  constructor(private router: Router) {
    this.title = this.router.url.includes('register') ? 'Registrarse' : 'Iniciar sesión';
  }
}
