import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.SignupComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/admin').then((m) => m.AdminComponent),
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user/user').then((m) => m.UserComponent),
        canActivate: [authGuard, roleGuard],
        data: { role: 'user' },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
