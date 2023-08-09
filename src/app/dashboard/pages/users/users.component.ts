import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './users.service';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns: string[] = ['id', 'fullName', 'email', 'actions'];
  users: User[] = [];

  constructor(private _modalController: MatDialog, private _usersService: UsersService) {
    this._usersService.getUsers()
    .subscribe((users) => this.users = users);
  }

  openCreateUserModal(): void {
    const modalRef = this._modalController
    .open(UserFormComponent, { width: '400px' });

    modalRef.afterClosed().subscribe((userData: User) => {
      this._usersService.createUser(userData);
    });
  }

  openEditUserModal(userIndex: number): void {
    const modalRef = this._modalController
    .open(UserFormComponent, {
      width: '400px',
      data: {
        user: this.users[userIndex]
      }
    });

    modalRef.afterClosed().subscribe((userData: User) => {
      this._usersService.editUser(userData);
    });
  }

  openDeleteUserConfirmation(userId: number) {
    const modalRef = this._modalController.open(DialogComponent, {
      width: '300px',
      data: {
        buttonColor: 'warn',
        buttonText: 'Eliminar',
        title: 'Eliminar usuario',
        content: '¿Confirma que desea eliminar el usuario?'
      }
    });

    modalRef.afterClosed().subscribe((userConfirmation: boolean) => {
      if (userConfirmation) {
        this._usersService.deleteUser(userId);
      }
    });
  }
}
