import { Injectable, signal, PLATFORM_ID, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(this.getStoredUser());
  isAuthenticated = computed(() => !!this.currentUser());
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
  
  }

  private getStoredUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        localStorage.removeItem(this.USER_KEY);
      }
    }
    return null;
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  async signup(data: { name: string; email: string; password: string }): Promise<boolean> {
    this.isLoading.set(true);
    this.error.set('');

    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${environment.apiUrl}/auth/signup`, data, {
          withCredentials: true
        })
      );

      this.handleAuthSuccess(response);
      return true;
    } catch (err: any) {
      this.isLoading.set(false);
      this.error.set(err?.error?.message || 'Signup failed. Please try again.');
      return false;
    }
  }

  async login(data: { email: string; password: string }): Promise<boolean> {
    this.isLoading.set(true);
    this.error.set('');

    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, data, {
          withCredentials: true
        })
      );

      this.handleAuthSuccess(response);
      return true;
    } catch (err: any) {
      this.isLoading.set(false);
      this.error.set(err?.error?.message || 'Login failed. Please try again.');
      return false;
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ success: boolean; data: { accessToken: string } }>(
          `${environment.apiUrl}/auth/refresh`,
          {},
          { withCredentials: true }
        )
      );

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.AUTH_TOKEN, response.data.accessToken);
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  async getMe(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<{ success: boolean; data: { user: User } }>(
          `${environment.apiUrl}/auth/me`,
          { withCredentials: true }
        )
      );
      this.currentUser.set(response.data.user);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
      }
    } catch {
      // If /me fails, we might be invalid
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_TOKEN);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUser.set(null);
    this.router.navigate(['/login']);
    
  }

  private handleAuthSuccess(response: AuthResponse) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.AUTH_TOKEN, response.data.accessToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
    }

    this.currentUser.set(response.data.user);
    this.isLoading.set(false);

    const role = response.data.user.role.toUpperCase();
    if (role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }
}
