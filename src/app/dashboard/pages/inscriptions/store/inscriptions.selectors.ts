import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);

export const inscriptionsData = createSelector(selectInscriptionsState, (state) => state.data);

export const courseOptions = createSelector(selectInscriptionsState, (state) => state.courseOptions);
export const studentOptions = createSelector(selectInscriptionsState, (state) => state.studentOptions);

