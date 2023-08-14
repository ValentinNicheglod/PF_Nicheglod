import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './models';
import { Observable } from 'rxjs';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns: string[];
  users: Observable<User[]>;

  constructor(private _usersService: UsersService, private _dashboardService: DashboardService) {
    this.users = this._usersService.observable;
    this.columns = this._usersService.columns;
  }

  openEditUserModal(user: User): void {
    this._dashboardService.openEditionModal({ user });
  }

  openDeleteUserConfirmation(userId: number) {
    this._dashboardService.openDeleteConfirmation(userId, 'usuario');
  }
}
