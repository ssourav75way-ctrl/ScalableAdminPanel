import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(role: UserRole) {
    this.authService.login(role);
    const destination = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    this.router.navigate([destination]);
  }
}
