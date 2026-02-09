import { Injectable, signal } from '@angular/core';
export type UserRole = 'admin' | 'user';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN = 'auth_token';
  private readonly USER_ROLE = 'user_role';

  currentUser = signal<User | null>(this.getStoredUser());
  isAuthenticated = signal<boolean>(this.checkToken());

  private checkToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN);
  }

  private getStoredUser(): User | null {
    const role = localStorage.getItem(this.USER_ROLE) as UserRole;
    if (role) {
      return { id: '1', name: role === 'admin' ? 'Admin User' : 'Standard User', role };
    }
    return null;
  }

  login(role: UserRole) {
    localStorage.setItem(this.AUTH_TOKEN, 'dummy-token');
    localStorage.setItem(this.USER_ROLE, role);
    this.currentUser.set({
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'Standard User',
      role,
    });
    this.isAuthenticated.set(true);
    return true;
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN);
    localStorage.removeItem(this.USER_ROLE);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
