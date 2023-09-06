import { createActionGroup, props } from "@ngrx/store";
import { User } from "../dashboard/pages/users/models";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{email: string, password: string}>(),
    'set auth user': props<{ data: User | null }>()
  }
})
