import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', icon: '💰', trend: 'up' },
    { label: 'Active Users', value: '1,240', change: '+18.2%', icon: '👥', trend: 'up' },
    { label: 'NPS Score', value: '8.4', change: '-2.1%', icon: '⭐', trend: 'down' },
    { label: 'Conversion', value: '3.2%', change: '+0.4%', icon: '⚡', trend: 'up' },
  ];

  recentActivity = [
    { title: 'New order from Apple Inc.', time: '2 minutes ago', status: 'completed' },
    { title: 'Server load exceeded 80%', time: '1 hour ago', status: 'warning' },
    { title: 'Payment processed for Stripe', time: '3 hours ago', status: 'completed' },
    { title: 'User John Doe requested a refund', time: '5 hours ago', status: 'pending' },
  ];
}
