import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAdminUser } from 'src/app/store/auth.selector';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(isAdminUser) || router.createUrlTree(['/dashboard/home']);
};
