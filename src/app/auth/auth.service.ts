import { Injectable } from '@angular/core';
import { LoginRequest } from './models';
import { User } from '../dashboard/pages/users/models';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { UsersService } from '../dashboard/pages/users/users.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [];

  constructor(private userService: UsersService, private sharedService: SharedService, private router: Router, private store: Store) {
    this.userService.users.subscribe((users) => this.users = users);
    this.getStoredUser();
  }

  getStoredUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.store.dispatch(AuthActions.setAuthUser({ data: JSON.parse(storedUser) }));
    }
  }

  login(loginData: LoginRequest): void {
    const loggedUser = this.users.find((user) => user.email === loginData.email);
    if (loggedUser && loggedUser.password === loginData.password) {
      this.store.dispatch(AuthActions.setAuthUser({ data: loggedUser }));
      localStorage.setItem('user', JSON.stringify(loggedUser));
      this.router.navigate(['/dashboard']);
    } else {
      this.sharedService.showAlert('Correo o contraseña incorrectos');
    }
  }

  logout() {
    this.store.dispatch(AuthActions.setAuthUser({ data: null }));
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
