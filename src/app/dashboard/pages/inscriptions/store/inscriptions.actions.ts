import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscriptionData } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionData[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
  }
});
