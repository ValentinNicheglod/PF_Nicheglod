import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionData } from '../models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  data: InscriptionData[] | null;
}

export const initialState: State = {
  data: null
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => state),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      data: action.data
    }
  }),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => state),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

