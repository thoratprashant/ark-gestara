import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './patient-layout.html',
})
export class PatientLayout {
  protected readonly sidebarOpen = signal(false);
  protected readonly headerCompact = signal(false);

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
