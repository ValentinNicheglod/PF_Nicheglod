import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { LoginRequest } from './models';
import { usersList } from '../dashboard/pages/users/mocks/user-mock';
import { User } from '../dashboard/pages/users/models';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mockUser = usersList[0];

  private _authUser = new BehaviorSubject<User | null>(null);
  public authUser = this._authUser.asObservable();

  constructor(private sharedService: SharedService, private router: Router) { }

  isAuthenticated(): Observable<boolean> {
    return this.authUser.pipe(
      map((user) => !!user),
      take(1)
    );
  }

  login(loginData: LoginRequest): void {
    if (loginData.email === this.mockUser.email && loginData.password === this.mockUser.password) {
      this._authUser.next(this.mockUser);
      this.router.navigate(['/dashboard']);
    } else {
      this.sharedService.showAlert('Correo o contraseña incorrectos');
    }
  }
}
