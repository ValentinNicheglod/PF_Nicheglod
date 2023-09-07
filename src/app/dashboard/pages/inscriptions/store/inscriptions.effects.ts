import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { HttpClient } from '@angular/common/http';
import { Inscription, InscriptionData, InscriptionRequest } from '../models';
import { CoursesService } from '../../courses/courses.service';
import { Course } from '../../courses/models';
import { StudentsService } from '../../students/students.service';
import { Student } from '../../students/models';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.getInscriptions()
        .pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error })))
        )
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadCourseOptions),
      concatMap(() =>
        this.getCourseOptions()
        .pipe(
          map(data => InscriptionsActions.loadCourseSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadCourseFailure({ error })))
        )
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadStudentOptions),
      concatMap(() =>
        this.getStudentOptions()
        .pipe(
          map(data => InscriptionsActions.loadStudentSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadStudentFailure({ error })))
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.createInscription(action.data)
        .pipe(
          map(data => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionsActions.createInscriptionFailure({ error })))
        )
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionsActions.loadInscriptions()))
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpClient: HttpClient,
    private _coursesService: CoursesService,
    private _studentService: StudentsService,
  ) {}

  private getInscriptions(): Observable<InscriptionData[]> {
    const url = 'http://localhost:3000/inscriptions?_expand=student&_expand=course';
    return this.httpClient.get<InscriptionData[]>(url);
  }

  private getCourseOptions(): Observable<Course[]> {
    return this._coursesService.observable
      .pipe(take(1));
  }

  private getStudentOptions(): Observable<Student[]> {
    return this._studentService.observable
      .pipe(take(1));
  }

  private createInscription(data: InscriptionRequest): Observable<Inscription> {
    return this.httpClient.post<Inscription>('http://localhost:3000/inscriptions', data)
  }
}
