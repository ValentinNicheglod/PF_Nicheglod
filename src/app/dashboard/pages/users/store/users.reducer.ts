import { createFeature, createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';

export const usersFeatureKey = 'users';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUserss, state => state),

);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

