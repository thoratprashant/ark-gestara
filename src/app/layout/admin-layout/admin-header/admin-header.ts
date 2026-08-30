import { Component, output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
})
export class AdminHeader {
  readonly menuClick = output<void>();
}
