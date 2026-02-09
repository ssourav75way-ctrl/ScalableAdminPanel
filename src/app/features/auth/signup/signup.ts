import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  isLoading = this.authService.isLoading;
  error = this.authService.error;

  async onSignup() {
    const name = this.name();
    const email = this.email();
    const password = this.password();
    const confirmPassword = this.confirmPassword();

    if (!name || !email || !password || !confirmPassword) {
      this.authService.error.set('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.authService.error.set('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      this.authService.error.set('Password must be at least 6 characters');
      return;
    }

    const success = await this.authService.signup({ name, email, password });
    if (success) {
      this.name.set('');
      this.email.set('');
      this.password.set('');
      this.confirmPassword.set('');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
