import { Component } from '@angular/core';
import { Inscription, NameData } from './models/index';
import { Observable, map } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { InscriptionsService } from './inscriptions.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {
  columns: string[];
  inscriptions: Observable<Inscription[]>;

  courseNames: Observable<NameData>;
  studentNames: Observable<NameData>;

  constructor(
    private _inscriptionsService: InscriptionsService,
    private _dashboardService: DashboardService
  ) {
    this.inscriptions = this._inscriptionsService.observable;
    this.columns = this._inscriptionsService.columns;

    this.courseNames = this._inscriptionsService.courseNames$;
    this.studentNames = this._inscriptionsService.studentNames$
  }

  openEditInscriptionModal(inscription: Inscription): void {
    this._dashboardService.openEditionModal({ inscription });
  }

  openDeleteInscriptionConfirmation(inscriptionId: number) {
    this._dashboardService.openDeleteConfirmation(inscriptionId, 'inscripción', 'la');
  }

}
