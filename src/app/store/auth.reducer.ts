import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { User } from "../dashboard/pages/users/models";

export const authKey = 'auth';

export interface AuthDataModel {
  user: User | null
}

const initialState: AuthDataModel = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (currentState, action) => {
    return {
      user: null,
    }
  }),
  on(AuthActions.setAuthUser, (currentState, action) => {
    return {
      user: action.data,
    }
  }),
);
