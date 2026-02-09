import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private authService = inject(AuthService);

  role = computed(() => this.authService.currentUser()?.role || 'user');

  navItems = computed(() => {
    const r = this.role();
    const base = `/${r}`;

    if (r === 'admin') {
      return [
        { label: 'Admin Panel', path: `${base}/dashboard`, icon: '🛡️' },
        { label: 'Analytics', path: `${base}/analytics`, icon: '📈' },
        { label: 'User Management', path: `${base}/users`, icon: '👥' },
        { label: 'Settings', path: `${base}/settings`, icon: '⚙️' },
      ];
    } else {
      return [
        { label: 'User Dashboard', path: `${base}/dashboard`, icon: '📊' },
        { label: 'My Tasks', path: `${base}/tasks`, icon: '📋' },
        { label: 'Profile', path: `${base}/profile`, icon: '👤' },
        { label: 'Settings', path: `${base}/settings`, icon: '⚙️' },
      ];
    }
  });
}
