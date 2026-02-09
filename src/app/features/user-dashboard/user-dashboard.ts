import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboardComponent {
  myTasks = [
    { title: 'Complete profile setup', status: 'pending' },
    { title: 'Review security guidelines', status: 'completed' },
    { title: 'Verify email address', status: 'completed' },
  ];
}
