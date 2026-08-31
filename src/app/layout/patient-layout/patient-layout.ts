import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './patient-layout.html',
  styleUrl: './patient-layout.scss',
})
export class PatientLayout {
  constructor(private readonly router: Router) {}

  protected readonly sidebarOpen = signal(false);
  protected readonly headerCompact = signal(false);

  protected dashboardNavigationActive(): boolean {
    const path = this.router.url.split(/[?#]/, 1)[0];

    return path === '/patient/patient-listing' || path.startsWith('/patient/dashboard');
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((isOpen) => !isOpen);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeSidebar();
  }

  @HostListener('window:scroll')
  protected handleWindowScroll(): void {
    if (!this.headerCompact() && window.scrollY > 24) {
      this.headerCompact.set(true);
      return;
    }

    if (this.headerCompact() && window.scrollY <= 8) {
      this.headerCompact.set(false);
    }
  }
}
