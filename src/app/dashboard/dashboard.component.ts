import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './pages/users/users.service';
import { User } from './pages/users/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private _modalController: MatDialog, private _userService: UsersService) {}

  users: User[] = [];

  /* openNewUsersModal(): void {
    const modalRef = this._modalController.open(UserFormComponent, {
      width: '400px',
      data: {
        modalTitle: 'Crear usuario'
      }
    });

    modalRef.afterClosed().subscribe((userData: User) => {
      this.createUser(userData);
    });
  }

  createUser(userData: User) {
    this._userService.createUser(userData);
    this.users = [
      ...this.users,
      userData
    ];
  } */
}
