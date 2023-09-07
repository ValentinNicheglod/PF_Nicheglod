import { Component } from '@angular/core';
import { Inscription, InscriptionData, NameData } from './models/index';
import { Observable, map } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { InscriptionsService } from './inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { inscriptionsData, selectInscriptionsState } from './store/inscriptions.selectors';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {
  columns: string[];
  inscriptions: Observable<Inscription[] | null>;

  /* courseNames: Observable<NameData>;
  studentNames: Observable<NameData>; */

  constructor(
    private _inscriptionsService: InscriptionsService,
    private _dashboardService: DashboardService,
    private store: Store
  ) {
    this.store.dispatch(InscriptionsActions.loadInscriptions())
    /* this.inscriptions = this._inscriptionsService.observable; */
    this.columns = this._inscriptionsService.columns;
    this.inscriptions = this.store.select(inscriptionsData);

    /* this.courseNames = this._inscriptionsService.courseNames$;
    this.studentNames = this._inscriptionsService.studentNames$ */
  }

  openEditInscriptionModal(inscription: Inscription): void {
    this._dashboardService.openEditionModal({ inscription });
  }

  openDeleteInscriptionConfirmation(inscriptionId: number) {
    this._dashboardService.openDeleteConfirmation(inscriptionId, 'inscripción', 'la');
  }

}
