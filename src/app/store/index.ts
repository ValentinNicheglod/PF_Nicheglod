import { ActionReducerMap } from "@ngrx/store";
import { AuthDataModel, authKey, authReducer } from "./auth.reducer";

interface AppState {
  [authKey]: AuthDataModel;
}

export const appReducer: ActionReducerMap<any> = {
  [authKey]: authReducer,
};
