import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin-header',
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
})
export class AdminHeader {
  readonly menuClick = output<void>();
  readonly profileClick = output<void>();
  readonly logoutClick = output<void>();
}
