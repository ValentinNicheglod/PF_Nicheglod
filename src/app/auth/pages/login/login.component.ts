import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';
import { authState } from 'src/app/store/auth.selector';
import { AuthActions } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private store: Store) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Asi obtenemos todo el store
    this.store.subscribe({
      next: (data) => { console.log(data) }
    })

    // Asi solo auth
    this.store.select(authState).subscribe({
      next: (data) => { console.log(data) }
    })
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.getRawValue();
      this.authService.login(loginData);

      // this.store.dispatch(AuthActions.login())

    } else {
      this.loginForm.markAllAsTouched();
      // El formulario no es válido, puedes mostrar mensajes de error o realizar alguna acción en este caso.
    }
  }
}
