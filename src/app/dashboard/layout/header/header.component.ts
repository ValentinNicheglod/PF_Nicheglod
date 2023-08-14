import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = '';
  buttonText?: string | null = null;

  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.headerData
      .subscribe((headerData) => {
        this.title = headerData.title;
        this.buttonText = headerData.buttonText;
      })
  }

  openCreationModal() {
    this._dashboardService.openCreationModal()
  }
}
