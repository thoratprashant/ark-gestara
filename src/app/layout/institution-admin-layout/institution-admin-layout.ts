import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InstitutionAdminProfileState } from '../../features/institution-admin/institution-admin-profile-state';

@Component({
  selector: 'app-institution-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './institution-admin-layout.html',
  styleUrl: './institution-admin-layout.scss',
})
export class InstitutionAdminLayout {
  protected readonly profileState = inject(InstitutionAdminProfileState);
  protected readonly mobileNavigationOpen = signal(false);

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update((open) => !open);
  }

  protected closeMobileNavigation(): void {
    this.mobileNavigationOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeMobileNavigation();
  }
}
