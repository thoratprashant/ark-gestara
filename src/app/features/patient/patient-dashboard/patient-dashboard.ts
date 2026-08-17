import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.scss',
})
export class PatientDashboard {
  @ViewChild('patientSummary')
  private patientSummary?: ElementRef<HTMLElement>;

  private summaryManuallyCollapsed = false;

  readonly summaryExpanded = signal(true);
  readonly summarySticky = signal(false);
  readonly stickyLeft = signal(0);
  readonly stickyWidth = signal(0);
  readonly visitSummaryExpanded = signal(true);
  readonly progressNoteExpanded = signal(true);

  toggleVisitSummary(): void {
    this.visitSummaryExpanded.update((expanded) => !expanded);
  }

  toggleProgressNote(): void {
    this.progressNoteExpanded.update((expanded) => !expanded);
  }

  toggleSummary(): void {
    if (this.summarySticky()) {
      this.summaryManuallyCollapsed = false;

      if (window.scrollY <= 1) {
        this.summarySticky.set(false);
        this.summaryExpanded.set(true);
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    this.summaryExpanded.update((expanded) => {
      this.summaryManuallyCollapsed = expanded;
      return !expanded;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const summary = this.patientSummary?.nativeElement;

    if (!summary) {
      return;
    }

    const headerOffset = this.headerOffset();
    const summaryBounds = summary.getBoundingClientRect();

    if (
      !this.summarySticky() &&
      summaryBounds.top <= headerOffset
    ) {
      this.updateStickyBounds();

      if (this.summaryExpanded()) {
        this.summaryExpanded.set(false);
      }

      this.summarySticky.set(true);
      return;
    }

    if (
      this.summarySticky() &&
      window.scrollY <= 1
    ) {
      this.summarySticky.set(false);

      if (!this.summaryManuallyCollapsed) {
        this.summaryExpanded.set(true);
      }
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.summarySticky()) {
      this.updateStickyBounds();
    }
  }

  private updateStickyBounds(): void {
    const summary = this.patientSummary?.nativeElement;
    const dashboard = summary?.parentElement;

    if (dashboard) {
      const dashboardBounds = dashboard.getBoundingClientRect();
      this.stickyLeft.set(dashboardBounds.left);
      this.stickyWidth.set(dashboardBounds.width);
    }
  }

  private headerOffset(): number {
    return window.innerWidth < 992 ? 64 : 78;
  }
}
