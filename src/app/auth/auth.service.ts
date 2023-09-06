import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
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

  //TODO: Cambiar todos los behavior subject por store

  users: User[] = [];
  user: User | null = null;

  private _authUser = new BehaviorSubject<User | null>(null);
  public authUser = this._authUser.asObservable();

  constructor(private userService: UsersService, private sharedService: SharedService, private router: Router, private store: Store) {
    this.userService.users.subscribe((users) => this.users = users);
    this.getStoredUser();
  }

  get isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  isAuthenticated(): Observable<boolean> {
    this.getStoredUser();
    return this.authUser.pipe(
      map((user) => !!user),
      take(1)
    );
  }

  getStoredUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._authUser.next(JSON.parse(storedUser));
      this.user = JSON.parse(storedUser);
    }
  }

  login(loginData: LoginRequest): void {
    const loggedUser = this.users.find((user) => user.email === loginData.email);
    if (loggedUser && loggedUser.password === loginData.password) {
      this._authUser.next(loggedUser);
      this.user = loggedUser;
      this.store.dispatch(AuthActions.setAuthUser({ data: loggedUser }));
      localStorage.setItem('user', JSON.stringify(loggedUser));
      this.router.navigate(['/dashboard']);
    } else {
      this.sharedService.showAlert('Correo o contraseña incorrectos');
    }
  }

  logout() {
    this._authUser.next(null);
    this.user = null;
    this.store.dispatch(AuthActions.setAuthUser({ data: null }));
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
