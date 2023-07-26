import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { MainService } from './main.service';
import { User } from 'src/types';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  users: User[] = [];

  constructor(private _modalController: MatDialog, private _mainService: MainService) {
    _mainService.getUsers().subscribe((users) => this.users = users);
  }

  openNewUsersModal(): void {
    const modalRef = this._modalController.open(FormComponent, {
      width: '400px',
      data: {
        modalTitle: 'Crear usuario'
      }
    });

    modalRef.afterClosed().subscribe((userData: User) => {
      this.createUser(userData);
    });
  }

  openEditUsersModal(userIndex: number): void {
    const modalRef = this._modalController.open(FormComponent, {
      width: '400px',
      data: {
        modalTitle: 'Editar usuario',
        user: this.users[userIndex]
      }
    });

    modalRef.afterClosed().subscribe((userData: User) => {
      this.editUser(userData, userIndex);
    });
  }

  openDeleteUserConfirmation(userIndex: number) {
    const modalRef = this._modalController.open(DialogComponent, {
      width: '300px'
    });

    modalRef.afterClosed().subscribe((userConfirmation: boolean) => {
      if (userConfirmation) {
        this.deleteUser(userIndex);
      }
    });
  }

  createUser(userData: User) {
    this._mainService.createUser(userData);
    this.users = [
      ...this.users,
      userData
    ];
  }

  editUser(userData: User, userIndex: number) {
    this.users[userIndex] = userData;
  }

  deleteUser(userIndex: number) {
    this.users.splice(userIndex, 1);
  }
}
