import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'] as UserRole;
  const user = authService.currentUser();

  if (authService.isAuthenticated() && user?.role === expectedRole) {
    return true;
  }

  // Redirect to their default dashboard if they have the wrong role
  if (user?.role === 'admin') {
    return router.createUrlTree(['/admin/dashboard']);
  } else if (user?.role === 'user') {
    return router.createUrlTree(['/user/dashboard']);
  }

  return router.createUrlTree(['/login']);
};
