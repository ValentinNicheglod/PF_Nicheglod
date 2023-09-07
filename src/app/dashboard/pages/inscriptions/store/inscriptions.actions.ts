import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription, InscriptionData, InscriptionRequest } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionData[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Success': props<{ data: Course[] }>(),
    'Load Course Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Success': props<{ data: Student[] }>(),
    'Load Student Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ data: InscriptionRequest }>(),
    'Create Inscription Success': props<{ data: InscriptionRequest }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});
