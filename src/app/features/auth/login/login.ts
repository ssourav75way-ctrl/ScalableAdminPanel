import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  isLoading = this.authService.isLoading;
  error = this.authService.error;

  async onLogin() {
    const email = this.email();
    const password = this.password();

    if (!email || !password) {
      this.authService.error.set('Please enter email and password');
      return;
    }

    const success = await this.authService.login({ email, password });
    if (success) {
      this.email.set('');
      this.password.set('');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
