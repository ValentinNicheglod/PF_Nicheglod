import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { isAdminUser } from 'src/app/store/auth.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isAdminUser: Observable<boolean>;

  constructor (private _authService: AuthService, private store: Store) {
    this.isAdminUser = this.store.select(isAdminUser);
  }

  logout(): void {
    this._authService.logout();

  }
}
