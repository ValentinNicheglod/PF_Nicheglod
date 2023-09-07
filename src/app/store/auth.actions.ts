import { createActionGroup, props } from "@ngrx/store";
import { User } from "../dashboard/pages/users/models";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{email: string, password: string}>(),
    'Set Auth User': props<{ data: User | null }>()
  }
})
