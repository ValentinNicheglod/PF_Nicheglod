import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { HttpClient } from '@angular/common/http';
import { InscriptionData } from '../models';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getInscriptions()
        .pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  private getInscriptions(): Observable<InscriptionData[]> {
    const url = 'http://localhost:3000/inscriptions?_expand=student&_expand=course';
    return this.httpClient.get<InscriptionData[]>(url);
  }
}
