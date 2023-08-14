import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdmin: boolean;

  constructor (private _authService: AuthService) {
    this.isAdmin = this._authService.isAdmin;
  }

  logout(): void {
    this._authService.logout();

  }
}
