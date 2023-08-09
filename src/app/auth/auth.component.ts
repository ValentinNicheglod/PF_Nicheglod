import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  title: string;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.title = this.router.url.includes('register') ? 'Registrarse' : 'Iniciar sesión';
    console.log(this.router.url)
  }

  onSubmit() {
    if (this.loginForm.valid) {

    } else {

    }
  }

}
