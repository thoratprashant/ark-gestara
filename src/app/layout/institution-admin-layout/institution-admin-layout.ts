import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InstitutionAdminProfileState } from '../../features/institution-admin/institution-admin-profile-state';

@Component({
  selector: 'app-institution-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './institution-admin-layout.html',
  styleUrl: './institution-admin-layout.scss',
})
export class InstitutionAdminLayout {
  private readonly router = inject(Router);
  private readonly routerEvent = toSignal(this.router.events, { initialValue: null });
  protected readonly profileState = inject(InstitutionAdminProfileState);
  protected readonly mobileNavigationOpen = signal(false);
  protected readonly sidebarCollapsed = signal(false);
  protected readonly isDashboardPage = computed(() => {
    this.routerEvent();
    return this.router.url.startsWith('/institution-admin/dashboard');
  });

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update((open) => !open);
  }

  protected closeMobileNavigation(): void {
    this.mobileNavigationOpen.set(false);
  }

  protected toggleSidebar(): void {
    if (window.matchMedia('(max-width: 834px)').matches) {
      this.closeMobileNavigation();
      return;
    }

    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeMobileNavigation();
  }
}
