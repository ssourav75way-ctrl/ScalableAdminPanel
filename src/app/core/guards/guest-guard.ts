import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (authService.isAuthenticated()) {
    if (user?.role.toUpperCase() === 'ADMIN') {
      return router.createUrlTree(['/admin/dashboard']);
    } else {
      return router.createUrlTree(['/user/dashboard']);
    }
  }

  return true;
};
