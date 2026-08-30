import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeader } from './admin-header/admin-header';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminHeader, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  protected readonly sidebarCollapsed = signal(false);
  protected readonly mobileSidebarOpen = signal(false);

  protected toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  protected toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update((open) => !open);
  }

  protected closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeMobileSidebar();
  }
}
