import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../pages/users/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = '';
  buttonText?: string | null = null;
  user: Observable<User | null>;

  constructor(private _dashboardService: DashboardService, _authService: AuthService) {
    this._dashboardService.headerData
      .subscribe((headerData) => {
        this.title = headerData.title;
        this.buttonText = headerData.buttonText;
      })
      this.user = _authService.authUser;
  }

  openCreationModal() {
    this._dashboardService.openCreationModal()
  }
}
