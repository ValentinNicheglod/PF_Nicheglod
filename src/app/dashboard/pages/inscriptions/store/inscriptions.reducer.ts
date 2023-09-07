import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionData } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  data: InscriptionData[] | null;
  courseOptions: Course[];
  studentOptions: Student[];
}

export const initialState: State = {
  data: null,
  courseOptions: [],
  studentOptions: []
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data
    }
  }),

  on(InscriptionsActions.loadCourseOptions, state => state),
  on(InscriptionsActions.loadCourseSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  }),

  on(InscriptionsActions.loadStudentOptions, state => state),
  on(InscriptionsActions.loadStudentSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data
    }
  }),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

