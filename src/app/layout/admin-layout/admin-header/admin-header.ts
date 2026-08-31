import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
})
export class AdminHeader {
  readonly menuClick = output<void>();
  readonly logoutClick = output<void>();
}
