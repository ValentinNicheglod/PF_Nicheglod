import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthDataModel, authKey } from "./auth.reducer";

export const authState = createFeatureSelector<AuthDataModel>(authKey);

export const authUser = createSelector(authState, (state) => state.user);
