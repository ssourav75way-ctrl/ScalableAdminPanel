import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();
  const isLoginPage = state.url === '/login';

  if (authService.isAuthenticated()) {
    // If authenticated and trying to go to login, redirect to dashboard
    if (isLoginPage) {
      return router.createUrlTree([
        user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard',
      ]);
    }
    return true;
  }

  // If not authenticated and trying to go to login, let it through
  if (isLoginPage) {
    return true;
  }

  // Otherwise, redirect to login
  return router.createUrlTree(['/login']);
};
