import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Observable } from 'rxjs';
import { User } from '../../pages/users/models';
import { InscriptionsService } from '../../pages/inscriptions/inscriptions.service';
import { Store } from '@ngrx/store';
import { authUser } from 'src/app/store/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = '';
  buttonText?: string | null = null;
  user: Observable<User | null>;

  constructor(private _dashboardService: DashboardService, private _inscriptionService: InscriptionsService, private store: Store, ) {
    this._dashboardService.headerData
      .subscribe((headerData) => {
        this.title = headerData.title;
        this.buttonText = headerData.buttonText;
      })
      this.user = store.select(authUser);
  }

  openCreationModal() {
    if (this.title === 'Inscripciones') {
      this._inscriptionService.openCreationModal();
    } else {
      this._dashboardService.openCreationModal()
    }
  }
}
